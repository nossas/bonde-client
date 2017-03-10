import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import DefaultServerConfig from '../server/config'
import createReducer from './createReducer'
import DevTools from './components/dev-tools'

const api = axios.create({ baseURL: DefaultServerConfig.apiUrl })

const middlewares = [ promise ]

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`)
  const logger = createLogger()
  middlewares.push(logger)
}

export function configureStore (initialState, thunkExtraArgument) {
  middlewares.push(thunk.withExtraArgument({ axios, api, ...thunkExtraArgument }))

  let store = createStore(createReducer(), initialState, compose(
    applyMiddleware(...middlewares),

    process.env.NODE_ENV === 'development' ? DevTools.instrument() : f => f
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
