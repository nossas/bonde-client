import * as t from '../action-types'

export default (template) => (dispatch, getState, axios) => {
  dispatch({ type: t.REQUEST_TEMPLATE_CREATE })

  const { auth: { credentials } } = getState()
  return axios
    .post('/templates', template, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.SUCCESS_TEMPLATE_CREATE, template: data })
        return Promise.resolve()
      } else {
        dispatch({ type: t.FAILURE_TEMPLATE_CREATE, template: data })
        return Promise.reject({ _error: `Response code ${status}` })
      }
    })
    .catch(error => console.error('CreateTemplateAsyncError', error))
}
