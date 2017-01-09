export const REQUEST_TEMPLATE_CREATE = 'REQUEST_TEMPLATE_CREATE'
export const SUCCESS_TEMPLATE_CREATE = 'SUCCESS_TEMPLATE_CREATE'
export const FAILURE_TEMPLATE_CREATE = 'FAILURE_TEMPLATE_CREATE'

const createTemplateRequest = () => ({ type: REQUEST_TEMPLATE_CREATE })
const createTemplateSuccess = template => ({ type: SUCCESS_TEMPLATE_CREATE, template })
const createTemplateFailure = error => ({ type: FAILURE_TEMPLATE_CREATE, error })
export const createTemplateAsync = (template, next) =>
  (dispatch, getState, request) => {
    const { auth: { credentials } } = getState()
    const { mobilization, ...rest } = template
    const body = { ...rest, mobilization_id: mobilization.id }

    dispatch(createTemplateRequest())
    return request.createTemplate(body, credentials)
      .then(response => {
        dispatch(createTemplateSuccess(response.data))
        next && typeof next === 'function' && next()
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(createTemplateFailure(error))
        return Promise.reject({ _error: `Response ${error}` })
      })
  }

export const REQUEST_TEMPLATE_FETCH = 'REQUEST_TEMPLATE_FETCH'
export const SUCCESS_TEMPLATE_FETCH = 'SUCCESS_TEMPLATE_FETCH'
export const FAILURE_TEMPLATE_FETCH = 'FAILURE_TEMPLATE_FETCH'
const fetchTemplatesRequest = () => ({ type: REQUEST_TEMPLATE_FETCH })
const fetchTemplatesSuccess = templates => ({ type: SUCCESS_TEMPLATE_FETCH, templates })
const fetchTemplatesFailure = error => ({ type: FAILURE_TEMPLATE_FETCH, error })
export const fetchTemplatesAsync = () =>
  (dispatch, getState, request) => {
    const { auth: { credentials } } = getState()

    dispatch(fetchTemplatesRequest())
    return request.fetchTemplates(credentials)
      .then(response => {
        dispatch(fetchTemplatesSuccess(response.data))
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(fetchTemplatesFailure(error))
        return Promise.reject({ _error: `Response ${error}` })
      })
  }

export const REQUEST_TEMPLATE_DESTROY = 'REQUEST_TEMPLATE_DESTROY'
export const SUCCESS_TEMPLATE_DESTROY = 'SUCCESS_TEMPLATE_DESTROY'
export const FAILURE_TEMPLATE_DESTROY = 'FAILURE_TEMPLATE_DESTROY'
const destroyTemplateRequest = () => ({ type: REQUEST_TEMPLATE_DESTROY })
const destroyTemplateSuccess = template => ({ type: SUCCESS_TEMPLATE_DESTROY, template })
const destroyTemplateFailure = error => ({ type: FAILURE_TEMPLATE_DESTROY, error })
export const destroyTemplateAsync = template =>
  (dispatch, getState, request) => {
    const { auth: { credentials } } = getState()

    dispatch(destroyTemplateRequest())
    return request.destroyTemplate(template, credentials)
      .then(response => {
        dispatch(destroyTemplateSuccess(template))
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(destroyTemplateFailure(error))
        return Promise.reject({ _error: `Response ${error}` })
      })
  }
