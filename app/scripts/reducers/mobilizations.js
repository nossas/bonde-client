// TODO encapsulate all superagent calls in this file to an ApiClient
import superagent from 'superagent'

import {
  REQUEST_FETCH_MOBILIZATIONS,
  SUCCESS_FETCH_MOBILIZATIONS,
  FAILURE_FETCH_MOBILIZATIONS,
  REQUEST_EDIT_MOBILIZATION,
  SUCCESS_EDIT_MOBILIZATION,
  FAILURE_EDIT_MOBILIZATION,
  // TODO: deprecate this action
  EDIT_MOBILIZATION,
  // TODO implement REQUEST, SUCCESS and FAILURE for ADD_MOBILIZATION
  ADD_MOBILIZATION
} from './../constants/ActionTypes'

const initialState = {
  loaded: false,
  editing: false,
  data: []
}

export default function mobilizations (state = initialState, action) {
  switch (action.type) {
    case REQUEST_FETCH_MOBILIZATIONS:
      return {...state, loaded: false}
    case SUCCESS_FETCH_MOBILIZATIONS:
      return {...state, data: action.result, loaded: true}
    case FAILURE_FETCH_MOBILIZATIONS:
      return {...state, loaded: true}

    // TODO impllement REQUEST, SUCCESS and FAILURE action types
    case ADD_MOBILIZATION:
      return {...state, data: [action.mobilization, ...state.data]}

    // TODO deprecate this action type
    case EDIT_MOBILIZATION:
      return {
        ...state,
        data: state.data.map(
          m => m.id === action.mobilization.id ? action.mobilization : m
        )
      }

    case REQUEST_EDIT_MOBILIZATION:
      return {...state, editing: true}
    case SUCCESS_EDIT_MOBILIZATION:
      return {
        ...state,
        editing: false,
        data: state.data.map(
          m => m.id === action.result.id ? action.result : m
        )
      }
    case FAILURE_EDIT_MOBILIZATION:
      return {...state, editing: false}
    default:
      return state
  }
}

export function isMobilizationsLoaded (globalState) {
  return globalState.mobilizations.loaded
}

export function fetchMobilizations (options = {}) {
  return {
    types: [REQUEST_FETCH_MOBILIZATIONS, SUCCESS_FETCH_MOBILIZATIONS, FAILURE_FETCH_MOBILIZATIONS],
    promise: function () {
      return new Promise(function (resolve, reject) {
        superagent.get(`${process.env.API_URL}/mobilizations`)
        .send(options)
        .end((err, res) => {
          if (err) {
            reject(res.body || err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}

export function editMobilization (params) {
  return {
    types: [REQUEST_EDIT_MOBILIZATION, SUCCESS_EDIT_MOBILIZATION, FAILURE_EDIT_MOBILIZATION],
    promise: function () {
      return new Promise(function (resolve, reject) {
        superagent
          .put(`${process.env.API_URL}/mobilizations/${params.id}`)
          .set(params.credentials)
          .send({mobilization: params.mobilization})
          .end((err, res) => {
            if (err) {
              reject(res.body || err)
            } else {
              resolve(res.body)
            }
          })
      })
    }
  }
}
