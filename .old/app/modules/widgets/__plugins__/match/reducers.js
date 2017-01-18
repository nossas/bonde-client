import * as t from '../../../../modules/widgets/__plugins__/match/action-types'

export const initialState = {
  loading: false,
  error: undefined,
  data: []
}

export const initialAction = { type: '' }

export default function MatchReducers (state = initialState, action = initialAction) {
  switch (action.type) {
    case t.WIDGET_MATCH_CREATE_REQUEST:
      return { ...state, loading: true }
    case t.WIDGET_MATCH_CREATE_SUCCESS:
      return { ...state, loading: false }
    case t.WIDGET_MATCH_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case t.WIDGET_MATCH_UPDATE_REQUEST:
      return { ...state, loading: true }
    case t.WIDGET_MATCH_UPDATE_SUCCESS:
      return { ...state, loading: false }
    case t.WIDGET_MATCH_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case t.WIDGET_MATCH_DESTROY_REQUEST:
      return { ...state, loading: true }
    case t.WIDGET_MATCH_DESTROY_SUCCESS:
      return { ...state, loading: false }
    case t.WIDGET_MATCH_DESTROY_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case t.WIDGET_MATCH_SHOW_REQUEST:
      return { ...state, loading: true }
    case t.WIDGET_MATCH_SHOW_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case t.WIDGET_MATCH_SHOW_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case t.WIDGET_MATCH_ACTIVIST_CREATE_REQUEST:
      return { ...state, loading: true }
    case t.WIDGET_MATCH_ACTIVIST_CREATE_SUCCESS:
      return { ...state, loading: false }
    case t.WIDGET_MATCH_ACTIVIST_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
