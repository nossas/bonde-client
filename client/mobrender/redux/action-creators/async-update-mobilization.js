import { createAction } from './create-action'
import * as t from '../action-types'

export default (mobilization) =>
  (dispatch, getState, { api }) => {
    const { auth: { credentials } } = getState()
    const endpoint = `/mobilizations/${mobilization.id}`
    const config = { headers: credentials }

    dispatch({ type: t.UPDATE_MOBILIZATION_REQUEST })
    return api
      .put(endpoint, { mobilization }, config)
      .then(({ status, data }) => {
        dispatch({ type: t.UPDATE_MOBILIZATION_SUCCESS, payload: data })
        return Promise.resolve(data)
      })
      .catch(failure => {
        dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, failure))
        return Promise.reject({ error: `Response code ${failure}` })
      })
  }
