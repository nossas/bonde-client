const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1 // to scale to max cpu core -1
const WEB_MEMORY = process.env.WEB_MEMORY || 512
const NODE_PATH = process.env.NODE_PATH || './src'
const NODE_ENV = process.env.NODE_ENV || 'development'
const API_URL = process.env.API_URL || 'http://localhost:3000'
const APP_DOMAIN = process.env.APP_DOMAIN || 'localhost.dev:3001'
const PAGARME_KEY = process.env.PAGARME_KEY || 'ek_test_PYsS1XrZsCCF7wynC67YEi5RW3lSCV'
const NEW_RELIC_HOME = process.env.NEW_RELIC_HOME || './src'
const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY || ''
const WATCH = process.env.WATCH || false
const PORT = process.env.PORT || '3001'

module.exports = {
  apps: [{
    name: 'bonde-client',
    script: './bin/server.js',
    instances: WEB_CONCURRENCY,
    max_memory_restart: WEB_MEMORY + 'M',
    exec_mode: 'cluster',
    watch: WATCH,
    port: PORT,
    env: {
      PORT: PORT,
      NODE_PATH: NODE_PATH,
      NODE_ENV: NODE_ENV,
      API_URL: API_URL,
      APP_DOMAIN: APP_DOMAIN,
      PAGARME_KEY: PAGARME_KEY,
      NEW_RELIC_HOME: NEW_RELIC_HOME,
      NEW_RELIC_LICENSE_KEY: NEW_RELIC_LICENSE_KEY
    },
    env_production: {
      PORT: PORT,
      NODE_PATH: NODE_PATH,
      NODE_ENV: NODE_ENV,
      API_URL: API_URL,
      APP_DOMAIN: APP_DOMAIN,
      PAGARME_KEY: PAGARME_KEY,
      NEW_RELIC_HOME: NEW_RELIC_HOME,
      NEW_RELIC_LICENSE_KEY: NEW_RELIC_LICENSE_KEY,
      NPM_CONFIG_PRODUCTION: false
    }
  }]
}
