const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 1337,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  authPort: process.env.AUTH_PORT || 3005,
  appDomain: `app.${process.env.APP_DOMAIN}` || 'localhost',
  timeout: 60000
}

module.exports = config
