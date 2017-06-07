import { createAction } from './create-action'
import * as t from '../action-types'

export default ({ fieldName, ...mobilization }) =>
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
      .catch(({ ...errors, response }) => {
        if (response.status === 422 && response.data.errors) {
          const errors = response.data.errors
          if (response.data.errors.custom_domain) {
            errors[fieldName] = errors.custom_domain
            delete errors.custom_domain
          }
          dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, errors))
          return Promise.reject({ ...errors })
        } else {
          dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, errors))
          return Promise.reject({ error: `Response code ${errors}` })
        }
      })
  }
