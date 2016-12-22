const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 1337,
  timeout: 29000,
  mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/universal-js'
}

module.exports = config
