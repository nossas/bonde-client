import * as actionTypes from './actionTypes'

const initialState = {
  queries: [],
  observable: {}
}

export default (state = initialState, action) => {
  const queryset = action.payload
  switch (action.type) {
    case actionTypes.REGISTER:
      if (!state.queries.includes(action.payload)) {
        return {
          ...state,
          queries: [...state.queries, action.payload]
        }
      }
      return state
    case actionTypes.DONE:
      return {
        ...state,
        observable: Object.assign({}, state.observable, {
          [queryset.queryName]: {
            done: true,
            length: queryset.length
          }
        })
      }
    default:
      return state
  }
}
