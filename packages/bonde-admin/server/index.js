import http from 'http'
import express from 'express'

// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { Provider } from 'react-redux'
// import { StaticRouter } from 'react-router-dom'
// import { renderRoutes } from 'react-router-config'

// import path from 'path'
import winston from 'winston'
import expressWinston from 'express-winston'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import hpp from 'hpp'
import throng from 'throng'
import Raven from 'raven'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../tools/webpack.server'
import DefaultServerConfig from './config'

// import routes from '../routes-v1'
// import { configureStore } from '~client/store'

require('dotenv').config()

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production' || config.nodeEnv === 'staging'
  const __TEST__ = config.nodeEnv === 'test'

  const app = express()

  if (__PROD__ || __TEST__) {
    // if (__PROD__) {
    //   let assets = require('./../build/assets.json')
    // }
    app.use(helmet())
    app.use(hpp())
    app.use(compression())
    Raven.config(config.sentryDns).install()
    app.use(Raven.requestHandler())
  } else {
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      watchOptions: {
        aggregateTimeout: 900,
        poll: true
      },
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true
    }))
    app.use(webpackHotMiddleware(compiler))
  }

  app.disable('x-powered-by')
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({ colorize: true })
    ],
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true
  }))
  app.use(express.static('public'))
  app.use(cors())
  app.use(helmet())
  app.use(hpp())
  app.use(compression())
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'ejs')

  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({ colorize: true })
    ]
  }))

  app.get('/_version', function (req, res) {
    let p = require('child_process')
    res.json({hash: p.execSync('git rev-parse --short HEAD').toString().trim()})
  })

  // const initialState = store.getState()
  // const store = configureStore(initialState)

  // app.get('*', (req, res) => {
  //   let context = {}
  //   const content = renderToString(
  //     <Provider store={store}>
  //       <StaticRouter location={req.url} context={context}>
  //         {renderRoutes(routes)}
  //       </StaticRouter>
  //     </Provider>
  //   )
  //   res.render(
  //     path.join(__dirname, '/../tools/index.template.ejs'),
  //     { title: 'Express', data: false, content }
  //   )
  // })

  if (__PROD__) { app.use(Raven.errorHandler()) }

  const server = http.createServer(app)

  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message
      ].join(`\r\n`))
    })
  }

  return server
}

const startServer = (serverConfig) => {
  const config = { ...DefaultServerConfig, ...serverConfig }

  const server = createServer(config)
  server.listen(config.port, (err) => {
    if (err) winston.log(err)
    if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
      winston.info(`server ${config.id} listening on port ${config.port}`)
    } else {
      if (err) {
        console.log(err)
      }
      console.log('Starting development server...' + config.port)
    }
  })
}

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  })
}

// const server = createServer({})
// server.listen(3005, err => {
//   console.error(JSON.stringify(err))
// })
