import * as t from '../action-types'
import { createAction } from './create-action'

const asyncFilter = query => (dispatch, getState, { api }) => {
  const endpoint = '/mobilizations'
  const config = { params: query }

  dispatch({ type: t.ASYNC_FILTER_REQUEST })
  return api.get(endpoint, config)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(createAction(t.ASYNC_FILTER_SUCCESS, data))
        return Promise.resolve()
      }

      return Promise.reject({ message: `Request code ${status}` })
    })
    .catch(failure => {
      dispatch(createAction(t.ASYNC_FILTER_FAILURE, failure.message))
      return Promise.reject({ message: `Request ${failure}` })
    })
}

export default asyncFilter
