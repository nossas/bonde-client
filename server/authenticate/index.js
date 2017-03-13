import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import * as actions from './routes/index'

const app = express()

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'reboo-org'
}))

app.use(bodyParser.json())

export const startServer = config => new Promise((resolve) => {
  app.use((req, res) => {
    const matcher = req.url.split('?')[0].split('/')
    const action = matcher && actions[matcher[1]]
    if (action) {
      action(req, matcher.slice(2))
        .then((result) => {
          res.json(result)
        }, (reason) => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect)
          } else {
            console.error('Authenticate error:', reason)
            res.status(reason.status || 500).json(reason)
          }
        })
    } else {
      res.status(404).end('NOT FOUND')
    }
  })
  app.listen(config.authPort)
  resolve()
})
