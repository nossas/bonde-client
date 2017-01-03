import raven from 'raven'
import newrelic from 'newrelic'
import Express from 'express'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import Location from 'react-router/lib/Location'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import createStore from './redux/create'
import authApi from './api/api'
import ApiClient from './ApiClient'
import universalRouter from './universalRouter'
import Html from './Html'
import responseTime from 'response-time'
import winston from 'winston'
import expressWinston from 'express-winston'
import NewrelicWinston from 'newrelic-winston'
import proxy from 'http-proxy-middleware'

const app = new Express()

app.use(responseTime())
app.use(compression())
app.use(helmet({
  frameguard: false
}))
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(require('serve-static')(path.join(__dirname, '..', 'static')))

app.use('/auth', proxy({
  target: `http://localhost:${config.apiPort}`,
  pathRewrite: { '^/auth': '' }
}))

app.get(/\/users|\/pt\/users|\/membros/, function (req, res) {
  res.redirect('/')
})

app.get('/robots.txt', function (req, res) {
  res.send('User-Agent: * \n' +
    'Allow: /')
})

if ((app.get('env') === 'production') || (app.get('env') === 'staging')) {
  // The error handler must be before any other error middleware
  app.use(raven.middleware.express.errorHandler(process.env.SENTRY_DSN))
}

app.use((req, res, next) => {
  const host = req.headers.host
  const isAppDomain = host === process.env.APP_DOMAIN
  if (isAppDomain) {
    res.redirect(301, `${req.protocol}://app.${host}${req.originalUrl}`)
    return
  }
  next()
})

app.use((req, res, next) => {
  const host = req.headers.host
  const isAppSubdomain = host.indexOf(`app.${process.env.APP_DOMAIN}`) !== -1
  const www = host.match(/^www\.(.*)/)
  const domains = require('fs').readFileSync('./src/redirect.blacklist')
  const lines = domains.toString().split('\n')
  const blacklist = lines.some(line => { if (line) return host.match(line) })

  if (!isAppSubdomain && !__DISABLE_SSR__ && !www && !blacklist) {
    res.redirect(301, `${req.protocol}://www.${host}`)
    return
  } else if (!isAppSubdomain && !__DISABLE_SSR__ && www && blacklist) {
    res.redirect(301, `${req.protocol}://${www[1]}`)
    return
  }
  next()
})

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  const client = new ApiClient(req)
  const store = createStore(client)
  const location = new Location(req.path, req.query)
  if (__DISABLE_SSR__) {
    res.send('<!doctype html>\n' +
      ReactDOMServer.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div />} store={store} />))
  } else {
    universalRouter(location, undefined, store, req.headers.host)
      .then(({component, transition, isRedirect}) => {
        if (isRedirect) {
          res.redirect(transition.redirectInfo.pathname)
          return
        }
        res.send('<!doctype html>\n' +
          ReactDOMServer.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />))
      })
      .catch((error) => {
        if (error.redirect) {
          res.redirect(error.redirect)
          return
        }
        winston.error('ROUTER ERROR:', error)
        res.status(500).send({error: error.stack})
      })
  }
})

// express-winston errorLogger makes sense AFTER the router.
winston.add(NewrelicWinston, {})

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  expressFormat: true,
  colorStatus: true
}))

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      winston.error(err)
    } else {
      authApi().then(() => {
        winston.info('==> ✅  Server is listening')
        winston.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort)
        winston.info('----------\n==> 🚀  Open http://%s in a browser to view the app.', process.env.APP_DOMAIN)
      })
    }
  })
} else {
  winston.error('==>     ERROR: No PORT environment variable has been specified')
}
