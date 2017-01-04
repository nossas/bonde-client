import {
  ADD_MOBILIZATION,
  EDIT_MOBILIZATION,

  PROGRESS_UPLOAD_FACEBOOK_IMAGE,
  FINISH_UPLOAD_FACEBOOK_IMAGE,

  SET_CURRENT_MOBILIZATION,
  SET_MOUSE_OVER,
  SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX,

  REQUEST_CREATE_MOBILIZATION_FROM_TEMPLATE,
  SUCCESS_CREATE_MOBILIZATION_FROM_TEMPLATE,
  FAILURE_CREATE_MOBILIZATION_FROM_TEMPLATE
} from './MobilizationActions'

import * as t from './actionTypes'

export const initialState = {
  loading: false,
  loaded: false,
  data: []
}

const MobilizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_FETCH_MOBILIZATIONS:
    case t.FETCH:
      return {
        ...state,
        loading: true,
        loaded: false,
        communityId: action.communityId
      }
    case t.SUCCESS_FETCH_MOBILIZATIONS:
    case t.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case t.FAILURE_FETCH_MOBILIZATIONS:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case PROGRESS_UPLOAD_FACEBOOK_IMAGE:
      return {
        ...state,
        isFacebookShareImageUploading: true
      }
    case FINISH_UPLOAD_FACEBOOK_IMAGE:
      return {
        ...state,
        isFacebookShareImageUploading: false
      }
    case ADD_MOBILIZATION:
    // Update list with new mobilization added
      return {
        ...state,
        data: [action.mobilization, ...state.data]
      }
    case EDIT_MOBILIZATION:
      return {
        ...state,
        data: state.data.map(
          mob => mob.id === action.mobilization.id ? action.mobilization : mob
        )
      }
    case SET_CURRENT_MOBILIZATION:
      return {
        ...state,
        currentId: action.currentId
      }
    case SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX:
      return {
        ...state,
        mobilizationMoreMenuActiveIndex: action.index
      }
    case REQUEST_CREATE_MOBILIZATION_FROM_TEMPLATE:
      return { ...state, loading: true }
    case SUCCESS_CREATE_MOBILIZATION_FROM_TEMPLATE:
      return { ...state, loading: false, loaded: false }
    case FAILURE_CREATE_MOBILIZATION_FROM_TEMPLATE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default MobilizationReducer
