import {
  REQUEST_EDIT_MOBILIZATION,
  SUCCESS_EDIT_MOBILIZATION,
  FAILURE_EDIT_MOBILIZATION
} from './../constants/ActionTypes'

const initialState = {
  loaded: false,
  editing: false,
  data: []
}

export default function mobilizations (state = initialState, action) {
  switch (action.type) {
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
