import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import axios from 'axios'
import DefaultServerConfig from '../server/config'
import createReducer from './createReducer'

const logger = createLogger()

const api = axios.create({
  baseURL: DefaultServerConfig.apiUrl
})

export function configureStore (initialState, thunkExtraArgument) {
  let store = createStore(createReducer(), initialState, compose(
    applyMiddleware(
      thunk.withExtraArgument({ axios, api, ...thunkExtraArgument }),
      promise,
      logger
    ),

    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ))

  store.asyncReducers = {}

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default))
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
