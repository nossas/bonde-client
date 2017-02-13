module.exports = {
  development: {
    isProduction: false,
    port: 3001,
    apiPort: 3030,
    app: {
      name: 'Bonde Development'
    }
  },
  staging: {
    isProduction: true,
    port: 5000,
    apiPort: 3030,
    app: {
      name: 'Bonde Staging'
    }
  },
  production: {
    isProduction: true,
    port: 5000,
    apiPort: 3030,
    app: {
      name: 'Bonde Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
