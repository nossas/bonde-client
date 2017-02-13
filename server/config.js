const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 1337,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  authPort: process.env.AUTH_PORT || 3005,
  appDomain: process.env.APP_DOMAIN || 'localhost',
  timeout: 60000,
  mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/universal-js'
}

module.exports = config
