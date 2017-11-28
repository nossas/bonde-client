import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import Cookies from 'universal-cookie'
import DefaultServerConfig from '~server/config'
import createReducer from './createReducer'
import DevTools from './components/dev-tools'
import { logout } from '~client/account/redux/action-creators'

const api = axios.create({ baseURL: DefaultServerConfig.apiUrl })

const middlewares = [promise]

const networkInterface = createNetworkInterface({
  uri: DefaultServerConfig.graphqlUrl,
  connectToDevTools: true
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    // Non-use auth for authenticate mutation to make a new JWT Token
    const requiredAuth = req.request.operationName !== 'authenticate'
    const cookies = new Cookies() // req.headers.cookie
    const state = cookies.getAll() || {}

    if (state.auth && state.auth['access-token'].length > 0 && requiredAuth) {
      const token = state.auth['access-token']
      req.options.headers.authorization = `Bearer ${token}`
    }
    next()
  }
}])

export const client = (options = {}) =>
  new ApolloClient({
    ssrMode: true,
    networkInterface,
    ...options
  })

export function configureStore (initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument
    })
  )

  middlewares.push(client().middleware())

  let store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV === 'development' ? DevTools.instrument() : f => f
    )
  )

  store.asyncReducers = {}

  api.interceptors.response.use(
    response => {
      return response
    },
    ({ response, ...error }) => {
      if (response && response.status === 401) {
        store.dispatch(logout())
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response, ...error })
    }
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      )
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
