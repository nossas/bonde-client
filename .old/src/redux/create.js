import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'

import { Request } from '../api'
import rootReducer from '../ducks/reducer'
import createMiddleware from './clientMiddleware'

const getDebugSessionKey = () => {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
  return (matches && matches.length > 0)? matches[1] : null
}

export default function createApiClientStore(client, initialState) {
  const request = new Request()
  const thunkWithExtraArgument = thunk.withExtraArgument(request)
  const middleware = createMiddleware(client)
  let enhancer

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools')
    const DevTools = require('./DevTools')
    enhancer = compose(
      applyMiddleware(thunkWithExtraArgument),
      applyMiddleware(middleware),
      DevTools.instrument(),
      persistState(getDebugSessionKey())
    )(createStore)
  } else {
    enhancer = compose(
      applyMiddleware(thunkWithExtraArgument),
      applyMiddleware(middleware)
    )(createStore)
  }

  const store = enhancer(rootReducer, initialState)
  store.client = client
  store.request = request

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../ducks/reducer', () => {
      store.replaceReducer(require('../ducks/reducer'))
    })
  }

  return store
}
