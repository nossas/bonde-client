import { createAction } from './create-action'
import {
  LOAD_DASHBOARD_REQUEST,
  LOAD_DASHBOARD_SUCCESS,
  LOAD_DASHBOARD_ERROR, ROOT_URL
} from '../constants'

export function loadDashboard () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_DASHBOARD_REQUEST })
    return axios.get(`${ROOT_URL}/users/dashboard`)
      .then(res => {
        dispatch(createAction(LOAD_DASHBOARD_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(LOAD_DASHBOARD_ERROR, error))
      })
  }
}
