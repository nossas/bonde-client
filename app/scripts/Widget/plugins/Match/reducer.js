import superagent from 'superagent'

import {
  SHOW_MATCH_REQUEST,
  SHOW_MATCH_SUCCESS,
  SHOW_MATCH_FAILURE
} from '../../../constants/ActionTypes'
import {
  REQUEST_ADD_ACTIVIST_MATCH,
  SUCCESS_ADD_ACTIVIST_MATCH,
  FAILURE_ADD_ACTIVIST_MATCH
} from './actions'

export const initialState = { data: [] }
export const initialAction = { type: '' }

export default function matches (state = initialState, action = initialAction) {
  switch (action.type) {
    case SHOW_MATCH_REQUEST: return { ...state }
    case SHOW_MATCH_SUCCESS: return { ...state, data: action.result }
    case SHOW_MATCH_FAILURE: return { ...state }
    case REQUEST_ADD_ACTIVIST_MATCH: return { ...state, loading: true }
    case SUCCESS_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    case FAILURE_ADD_ACTIVIST_MATCH: return { ...state, loading: false }
    default: return state
  }
}

const handleError = (resolve, reject) => {
  return (err, res) => {
    if (err) reject(res.body || err)
    else resolve(res.body)
  }
}

export const showMatch = (params = {}) => {
  return {
    types: [SHOW_MATCH_REQUEST, SHOW_MATCH_SUCCESS, SHOW_MATCH_FAILURE],
    promise: () => new Promise((resolve, reject) => {
      superagent.get(`${process.env.API_URL}/widgets/${params.widget_id}/match/${params.match_id}`)
      .end(handleError(resolve, reject))
    })
  }
}
