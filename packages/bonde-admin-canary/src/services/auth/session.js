import { CrossStorageClient } from 'cross-storage'

class AuthAPI {
  constructor () {
    const crossStorageUrl = process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://cross-storage.bonde.devel'

    this.storage = new CrossStorageClient(crossStorageUrl, {
      timeout: 8000
    })
    this.token = undefined
    this.session = {}
  }

  login (user) {
    return this.storage.onConnect()
      .then(() => {
        this.authenticated = true
        this.token = user.jwtToken
        return this.storage.set('auth', JSON.stringify(user))
      })
  }

  logout () {
    return this.storage.onConnect()
      .then(() => {
        return this.storage.del('auth', 'community')
          .then(() => {
            this.token = undefined
            this.session = {}
          })
      })
  }

  getToken () {
    return this.token
  }

  getAsyncToken () {
    return this.storage.onConnect()
      .then(() => {
        return this.storage.get('auth')
      })
      .then(authJson => {
        if (authJson) {
          this.token = JSON.parse(authJson).jwtToken
          return Promise.resolve(this.token)
        }
      })
  }

  isAuthenticated () {
    return this.token !== undefined
  }

  setAsyncItem (key, value) {
    return this.storage.onConnect()
      .then(() => {
        return this.storage.set(key, JSON.stringify(value))
      })
  }

  getAsyncItem (key) {
    return this.storage.onConnect()
      .then(() => {
        return this.storage.get(key)
      })
      .then(value => {
        return Promise.resolve(JSON.parse(value))
      })
  }

  setItem (key, value) {
    this.session[key] = value
  }

  getItem (key, defaultValue) {
    return this.session[key] || defaultValue
  }
}

export default new AuthAPI()
