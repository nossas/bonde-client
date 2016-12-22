import superagent from 'superagent'
import {
  REQUEST_FETCH_ORGANIZATIONS,
  SUCCESS_FETCH_ORGANIZATIONS,
  FAILURE_FETCH_ORGANIZATIONS
} from './../constants/ActionTypes'


export const initialState = {
  loaded: false,
  editing: false,
  data: []
}

export default function organizations(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_FETCH_ORGANIZATIONS:
      return { ...state,
        loaded: false
      }
    case SUCCESS_FETCH_ORGANIZATIONS:
      return { ...state,
        data: action.result,
        loaded: true
      }
    case FAILURE_FETCH_ORGANIZATIONS:
      return { ...state,
        loaded: true
      }
    default:
      return state
  }
}

export function isOrganizationsLoaded(globalState = {}) {
  return !!(globalState.organizations && globalState.organizations.loaded)
}

export function fetchOrganizations() {
  return {
    types: [
      REQUEST_FETCH_ORGANIZATIONS,
      SUCCESS_FETCH_ORGANIZATIONS,
      FAILURE_FETCH_ORGANIZATIONS
    ],
    promise: function() {
      return new Promise(function(resolve, reject) {
        superagent.get(`${process.env.API_URL}/organizations`)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}
