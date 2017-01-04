import express from 'express'
import session from 'express-session'
import redisStore from 'connect-redis'
import bodyParser from 'body-parser'
import config from '../config'
import * as actions from './routes/index'
import winston from 'winston'
import redis from 'redis'
import url from 'url'

const redisUrl = process.env.REDIS_URL ?
  url.parse(process.env.REDIS_URL) :
  url.parse('redis://localhost:6379/reboo')
const redisClient = redis.createClient({url: redisUrl}) // replace with your config

redisClient.on('error', function(err) {
  winston.log('Redis error: ' + err)
})
const RedisStore = redisStore(session)
const rs = new RedisStore({ client: redisClient, maxAge: 24 * 60 * 7 * 1000 })
const app = express()

app.use(session({
  resave: false,
  saveUninitialized: false,
  // store: rs,
  secret: 'reboo-org'
  // cookie: { maxAge: 1000 * 60 * 24 * 7 }
}))

app.use(bodyParser.json())

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      const matcher = req.url.split('?')[0].split('/');
      const action = matcher && actions[matcher[1]];
      if (action) {
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              winston.error('API ERROR:', pretty.render(reason));
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });
    app.listen(config.apiPort);
    resolve();
  });
}
