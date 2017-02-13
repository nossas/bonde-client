import { createAction } from './create-action'
import {
  LOAD_FB_EVENT_REQUEST,
  LOAD_FB_EVENT_SUCCESS,
  LOAD_FB_EVENT_ERROR, ROOT_URL
} from '../constants'

export function loadFbEvent (id) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_FB_EVENT_REQUEST })
    return axios.get(`${ROOT_URL}/events/fb/${id}`)
      .then(res => {
        dispatch(createAction(LOAD_FB_EVENT_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(LOAD_FB_EVENT_ERROR, error))
      })
  }
}
