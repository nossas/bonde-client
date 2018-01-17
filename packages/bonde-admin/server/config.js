const config = {
  sentryDsn: process.env.SENTRY_DSN || 'https://1111:2222@sentry.io/86182',
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 1337,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  graphqlUrl: process.env.GRAPHQL_URL || 'http://localhost:3003/graphql',
  appDomain: process.env.APP_DOMAIN || 'localhost',
  timeout: 120000,
  defaultLocale: process.env.DEFAULT_LOCALE || 'pt-BR',
  locales: ['pt-BR', 'en', 'es']
}

module.exports = config
