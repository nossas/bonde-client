import { store } from '../redux'
import { db } from '../session'
import * as actionTypes from './redux/actionTypes'

const { dispatch, getState } = store

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
  
  login: (user) => new Promise((resolve, reject) => {
    dispatch({ type: actionTypes.LOGIN, payload: user })
    db.set('user', user).write()
    return resolve(user)
  }),

  logout: () => new Promise((resolve, reject) => {
    dispatch({ type: actionTypes.LOGOUT })
    db.unset('user').write()
    return resolve()
  }),
  
  isAuthenticated: () => !!getState().auth.user,

  getToken: () => db.get('user').value().jwtToken
}

export default AuthAPI
