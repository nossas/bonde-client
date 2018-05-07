import { store } from '../redux'
import { db } from '../session'
import * as actionTypes from './redux/actionTypes'

const { dispatch, getState } = store


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

  getUser: () => getState().auth.user
}

export default AuthAPI
