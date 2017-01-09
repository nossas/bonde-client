import superagent from 'superagent'

import * as t from './actionTypes'

// Constants
export const SET_CURRENT_MOBILIZATION = 'SET_CURRENT_MOBILIZATION'
export const ADD_MOBILIZATION = 'ADD_MOBILIZATION'
export const EDIT_MOBILIZATION = 'EDIT_MOBILIZATION'

export const PROGRESS_UPLOAD_FACEBOOK_IMAGE = 'PROGRESS_UPLOAD_FACEBOOK_IMAGE'
export const FINISH_UPLOAD_FACEBOOK_IMAGE = 'FINISH_UPLOAD_FACEBOOK_IMAGE'

export const SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX = 'SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX'

export const fetchMobilizations = (queryFilter = {}) => ({
  types: [
    t.REQUEST_FETCH_MOBILIZATIONS,
    t.SUCCESS_FETCH_MOBILIZATIONS,
    t.FAILURE_FETCH_MOBILIZATIONS
  ],
  promise: () => new Promise((resolve, reject) => {
    superagent
      .get(`${process.env.API_URL}/mobilizations`)
      .send(queryFilter)
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})

export const fetch = communityId => (dispatch, getState, request) => {
  const { auth: { credentials } } = getState()
  dispatch({ type: t.FETCH, communityId })
  return request
    .get(`/communities/${communityId}/mobilizations`, {}, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.FETCH_SUCCESS, result: data })
        return Promise.resolve()
      } else {
        return Promise.reject({ error: data })
      }
    })
    .catch(error => Promise.reject(error))
}

export const reset = () => dispatch => ({
  type: t.RESET
})

export const setCurrentMobilizationId = currentId => dispatch => dispatch({
  type: SET_CURRENT_MOBILIZATION,
  currentId: !isNaN(parseInt(currentId, 10)) ? parseInt(currentId, 10) : undefined
})

export const addMobilization = mobilization => ({ type: ADD_MOBILIZATION, mobilization })

export const addMobilizationAsync = (mobilization, next = null) => (dispatch, getState, request) => {
  const { credentials } = getState().auth

  return new Promise((resolve, reject) => {
    request
      .post(`/mobilizations`, { mobilization }, { headers: credentials })
      .then(response => {
        const { data } = response
        dispatch(addMobilization(data))
          // TODO: Update react-router and install react-router-redux to make only a push in history.
          // See: https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
        next && typeof next === 'function' && next(data)
        return resolve()
      })
      .catch(error => reject({ _error: `Response ${error}` }))
  })
}

export const editMobilization = mobilization => ({ type: EDIT_MOBILIZATION, mobilization })

export const editMobilizationAsync = (mobilization, next = null) => (dispatch, getState, request) => {
  const { credentials } = getState().auth

  return new Promise((resolve, reject) => {
    request
      .put(`/mobilizations/${mobilization.id}`, { mobilization }, { headers: credentials })
      .then(response => {
        const { data } = response
        dispatch(editMobilization(data))
        // TODO: Update react-router and install react-router-redux to make only a push in history.
        // See: https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
        next && typeof next === 'function' && next(data)
        return resolve()
      })
      .catch(error => reject({ _error: `Response ${error}` }))
  })
}

export const mobilizationsIsLoaded = state => state.mobilization.loaded
export const progressUploadFacebookImage = () => ({ type: PROGRESS_UPLOAD_FACEBOOK_IMAGE })
export const finishUploadFacebookImage = () => ({ type: FINISH_UPLOAD_FACEBOOK_IMAGE })
export const setMobilizationMoreMenuActiveIndex = index => dispatch => dispatch({
  type: SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX,
  index
})

export const REQUEST_CREATE_MOBILIZATION_FROM_TEMPLATE = 'REQUEST_CREATE_MOBILIZATION_FROM_TEMPLATE'
export const SUCCESS_CREATE_MOBILIZATION_FROM_TEMPLATE = 'SUCCESS_CREATE_MOBILIZATION_FROM_TEMPLATE'
export const FAILURE_CREATE_MOBILIZATION_FROM_TEMPLATE = 'FAILURE_CREATE_MOBILIZATION_FROM_TEMPLATE'
const createMobilizationFromTemplateRequest = () =>
  ({ type: REQUEST_CREATE_MOBILIZATION_FROM_TEMPLATE })
const createMobilizationFromTemplateSuccess = mobilization =>
  ({ type: SUCCESS_CREATE_MOBILIZATION_FROM_TEMPLATE, mobilization })
const createMobilizationFromTemplateFailure = error =>
  ({ type: FAILURE_CREATE_MOBILIZATION_FROM_TEMPLATE, error })
export const createMobilizationFromTemplateAsync = (template_mobilization_id, mobilization_id, next) =>
  (dispatch, getState, request) => {
    const { auth: { credentials } } = getState()
    const body = { template_mobilization_id }

    dispatch(createMobilizationFromTemplateRequest())
    return request
      .createMobilizationFromTemplate(body, mobilization_id, credentials)
      .then(response => {
        dispatch(createMobilizationFromTemplateSuccess(response.data))
        next()
        return Promise.resolve()
      })
      .catch(error => {
        dispatch(createMobilizationFromTemplateFailure(error))
        return Promise.reject({ _error: `Response ${error}` })
      })
  }
