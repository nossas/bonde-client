import { FILTERABLE_SEARCH_BAR_SET_LIST } from './FilterableSearchBarActions'

export const initialState = {
  list: []
}

const FilterableSearchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERABLE_SEARCH_BAR_SET_LIST:
      return { ...state, list: action.list }
    default:
      return state
  }
}

export default FilterableSearchBarReducer
