const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 1337,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  authPort: process.env.AUTH_PORT || 3005,
  appDomain: process.env.APP_DOMAIN || 'localhost',
  timeout: 120000,
  defaultLocale: process.env.DEFAULT_LOCALE || 'pt-BR',
  locales: ['pt-BR', 'en', 'es']
}

module.exports = config
