import * as t from '../action-types'

const initialState = {
  loaded: false,
  loading: false,
  data: [],
  saving: false,
  error: undefined
}

export default function reducer (state = initialState, action) {
  let data

  switch (action.type) {
    //
    // Async Actions
    //
    case t.REQUEST_ASYNC_WIDGET_UPDATE:
      return { ...state, saving: true }
    case t.SUCCESS_ASYNC_WIDGET_UPDATE:
      data = state.data.map(widget => widget.id === action.payload.id ? action.payload : widget)
      return { ...state, saving: false, data }
    case t.FAILURE_ASYNC_WIDGET_UPDATE:
      return { ...state, saving: false, error: action.payload }

    case t.REQUEST_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: false, loading: true }
    case t.SUCCESS_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: true, loading: false, data: action.payload }
    case t.FAILURE_ASYNC_WIDGET_FETCH:
      return { ...state, loaded: true, loading: false, error: action.payload }

    case t.REQUEST_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: false }
    case t.SUCCESS_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, data: action.payload }
    case t.FAILURE_ASYNC_WIDGET_SELECT:
      return { ...state, loaded: true, error: action.payload }

    case t.EXPORT_DATACLIP_SUCCESS:
      data = state.data.map(widget => {
        const exportedAt = widget.id === action.payload.widget.id ? new Date() : undefined
        return { ...widget, exported_at: exportedAt }
      })
      return { ...state, data }

    //
    // Sync Actions
    //
    case t.SET_WIDGET_LIST:
      return { ...state, data: action.payload }

    default:
      return state
  }
}
