import {
  SELECTABLE_LIST_SET_SELECTED_INDEX
} from './SelectableListActions'

export const initialState = {}

const SelectableListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTABLE_LIST_SET_SELECTED_INDEX:
      return { ...state, selectedIndex: action.index }
    default:
      return state
  }
}

export default SelectableListReducer
