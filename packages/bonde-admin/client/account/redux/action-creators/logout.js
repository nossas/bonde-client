import { createAction } from './create-action'
import * as t from '../action-types'

export default () => (dispatch) => {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('community')
    dispatch(createAction(t.LOGOUT_SUCCESS))
    resolve()
  })
}
