import * as t from './action-types'

export const initialState = {
  saving: false,
  filled: false,
  error: undefined
}

export const initialAction = { type: '' }

export default function PressureReducers (state = initialState, action = initialAction) {
  switch (action.type) {
    case t.WIDGET_PRESSURE_FILL_REQUEST:
      return { ...state, saving: true }
    case t.WIDGET_PRESSURE_FILL_SUCCESS:
      return { ...state, saving: false, filled: true }
    case t.WIDGET_PRESSURE_FILL_FAILURE:
      return { ...state, saving: false, error: action.payload }

    default:
      return state
  }
}
