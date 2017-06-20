import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import cookie from 'react-cookie'
import DefaultServerConfig from '~server/config'
import createReducer from './createReducer'
import DevTools from './components/dev-tools'
import { logout } from '~client/account/redux/action-creators'

const api = axios.create({ baseURL: DefaultServerConfig.apiUrl })

const middlewares = [ promise ]

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`)
  const logger = createLogger()
  middlewares.push(logger)
}

const networkInterface = createNetworkInterface({
  uri: DefaultServerConfig.graphqlUrl,
  connectToDevTools: true
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    cookie.plugToRequest(req)
    const state = cookie.load('auth') || {}
    if (state.auth && state.auth.credentials) {
      const token = state.auth.credentials['access-token']
      req.options.headers.authorization = `Bearer ${token}`
    }
    next();
  }
}])

export const client = new ApolloClient({ networkInterface })

export function configureStore (initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument
    })
  )

  let store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV === 'development'
        ? DevTools.instrument()
        : f => f
    )
  )

  store.asyncReducers = {}

  api.interceptors.response.use(
    (response) => {
      return response
    },
    ({ response, ...error }) => {
      if (response.status === 401) {
        store.dispatch(logout())
      }
      return Promise.reject({ response, ...error })
    }
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept(
        './createReducer',
        () => store.replaceReducer(
          require('./createReducer').default
        )
      )
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
