import axios from 'axios'
import { createAction } from './create-action'
import { browserHistory } from 'react-router'
import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR, ROOT_URL
} from '../constants'

export function createEvent ({ name }, dispatch) {
  dispatch({ type: CREATE_EVENT_REQUEST })
  return axios.post(`${ROOT_URL}/events`, { name })
    .then(res => {
      dispatch(createAction(CREATE_EVENT_SUCCESS, res))
      browserHistory.push(`/account/dashboard?created=true`)
    })
    .catch(error => {
      dispatch(createAction(CREATE_EVENT_ERROR, error))
    })
}
