import * as templates from './mock-templates'
import * as t from './action-types'
import {
  REQUEST_TEMPLATE_CREATE,
  SUCCESS_TEMPLATE_CREATE,
  FAILURE_TEMPLATE_CREATE,

  REQUEST_TEMPLATE_FETCH,
  SUCCESS_TEMPLATE_FETCH,
  FAILURE_TEMPLATE_FETCH,

  REQUEST_TEMPLATE_DESTROY,
  SUCCESS_TEMPLATE_DESTROY,
  FAILURE_TEMPLATE_DESTROY,

  SELECT_TEMPLATE
} from './action-types'


export const initialState = {
  loading: false,
  loaded: false,
  global: [],
  custom: [],
  templateId: undefined
}

const MobilizationTemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEMPLATE_CREATE:
      return { ...state, loading: true }
    case SUCCESS_TEMPLATE_CREATE:
      const templates = action.template.global ?
        { global: [...state.global, action.template] } :
        { custom: [...state.custom, action.template] }
      return { ...state, loading: false, loaded: true, ...templates }
    case FAILURE_TEMPLATE_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_TEMPLATE_FETCH:
      return { ...state, loading: true }
    case SUCCESS_TEMPLATE_FETCH:
      if (action.templates) {
        state.global = action.templates.filter(template => template.global)
        state.custom = action.templates.filter(template => !template.global)
      }
      return { ...state, loading: false, loaded: true }
    case FAILURE_TEMPLATE_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_TEMPLATE_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_TEMPLATE_DESTROY:
      const index = state.custom.findIndex(template => template.id === action.template.id)
      return {
        ...state,
        loading: false,
        custom: [...state.custom.slice(0, index), ...state.custom.slice(index + 1)]
      }
    case FAILURE_TEMPLATE_DESTROY:
      return { ...state, loading: false, error: action.error }
    case SELECT_TEMPLATE:
      return {
        ...state,
        templateId: action.payload
      }
    default:
      return state
  }
}

export default MobilizationTemplatesReducer
