import superagent from 'superagent'
import DefaultServerConfig from '../server/config'

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
export default class Client {

  constructor (server) {
    ['get', 'post', 'put', 'patch', 'del'].forEach(method => {
      this[method] = (path, config) => new Promise((resolve, reject) => {
        const request = superagent[method](this.formatUrl(path, server))
        // Set server cookie in request if server-side
        if (server && server.get('cookie')) {
          request.set('cookie', server.get('cookie'))
        }

        if (config && config.params) request.query(config.params)
        if (config && config.data) request.send(config.data)

        request.end((err, res) => {
          if (err) reject(res.body || err)
          else resolve(res.body)
        })
      })
    })
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl (path, server) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path
    if (server) {
      // Prepend host and port of the auth server to the path.
      return 'http://localhost:' + DefaultServerConfig.authPort + adjustedPath
    }
    // Prepend `/auth` to relative URL, to proxy to auth server.
    return '/auth' + adjustedPath
  }
}
