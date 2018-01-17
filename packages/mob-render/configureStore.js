import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import apiClient from './apiClient'
import apolloClient from './apolloClient'
import { intl as intlClient } from './intlReducer'
import createReducer, { sourceReqCreateReducer } from './createReducer'

const middlewares = [
  promise,
  thunk.withExtraArgument({
    intl: intlClient,
    api: apiClient,
    axios
  }),
  apolloClient().middleware()
]

export default (initialState, options) => {
  return createStore(
    createReducer({
      sourceRequest: sourceReqCreateReducer({
        host: (options && options.req && options.req.headers.host) || ''
      })
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  )
}
