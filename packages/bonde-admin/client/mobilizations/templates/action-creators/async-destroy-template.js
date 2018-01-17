/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'

const AsyncDestroyTemplate = template => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  dispatch({ type: t.REQUEST_TEMPLATE_DESTROY })
  return api
      .delete(`/templates/${template.id}`, { headers: credentials })
      .then(() => {
        dispatch({ type: t.SUCCESS_TEMPLATE_DESTROY, template })
        return Promise.resolve()
      })
      .catch(error => {
        dispatch({ type: t.FAILURE_TEMPLATE_DESTROY, error })
        return Promise.reject({ _error: `Response ${error}` })
      })
}

export default AsyncDestroyTemplate
