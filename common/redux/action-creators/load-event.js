import { createAction } from './create-action'
import {
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  LOAD_EVENT_ERROR, ROOT_URL
} from '../constants'

export function loadEvent (id) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_EVENT_REQUEST })
    return axios.get(`${ROOT_URL}/events/${id}`)
      .then(res => {
        dispatch(createAction(LOAD_EVENT_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(LOAD_EVENT_ERROR, error))
      })
  }
}
