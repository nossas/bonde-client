import { createStore } from 'redux'
import { fromJS } from 'immutable'

import createReducer from '~client/createReducer'

export default () => {
  const store = createStore(createReducer())
  return fromJS(store.getState())
}

