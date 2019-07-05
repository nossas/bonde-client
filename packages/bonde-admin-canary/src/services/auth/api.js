import { store } from 'services/redux'
import { db } from 'services/session'
import * as actionTypes from './redux/actionTypes'
import { CrossStorageClient } from 'cross-storage'

const { dispatch, getState } = store

const storage = new CrossStorageClient(
  process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://localhost:8888'
)

/**
 * API used on manage user authentication, depends on services/redux and
 * services/session.
 *
 * @type {object} AuthAPI
 * @property {function} login - Save user on redux and session, returns Promise.
 * @property {function} logout - Remove user on redux and store, returns
 * Promise.
 * @property {function} isAuthenticated - Return true when user register in
 * redux.
 * @property {function} getUser - Return the currentUser in redux.
 *
 */
const AuthAPI = {
  login: (user) => new Promise((resolve) => {
    dispatch({ type: actionTypes.LOGIN, payload: user })
    db.set('user', user).write()
    storage.onConnect()
      .then(() => {
        storage.set('auth', JSON.stringify(user))
      })
    return resolve(user)
  }),
  logout: () => new Promise((resolve) => {
    dispatch({ type: actionTypes.LOGOUT })
    db.unset('user').write()
    storage.onConnect()
      .then(() => {
        return storage.del('auth')
      })

    return resolve()
  }),
  isAuthenticated: () => !!getState().auth.user,
  getToken: () => {
    const user = db.get('user').value()
    return user ? user.jwtToken : undefined
  }
}

export default AuthAPI
