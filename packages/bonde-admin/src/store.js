import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import crossStorage from 'cross-storage-client'
import createReducer from './createReducer'
import DevTools from './components/dev-tools'

const logoutOnCanary = () => {
  const domain = process.env.REACT_APP_DOMAIN_ADMIN_CANARY || 'http://admin-canary.bonde.devel:5002'
  window.location.href = `${domain}/auth/login?next=${window.location.href}`
}

const api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_API_REST || 'http://api-v1.bonde.devel'
})

const middlewares = [promise]

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel/graphql',
  connectToDevTools: true
})

networkInterface.use([
  {
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // Non-use auth for authenticate mutation to make a new JWT Token
      // Donation has a public method { fetchDonationGoalStats }
      const requiredAuth =  !!!['authenticate', 'fetchDonationGoalStats'].find(
        x =>  x === req.request.operationName
      )
      if (require('exenv').canUseDOM && requiredAuth) {
        crossStorage.onConnect()
          .then(() => {
            return crossStorage.get('auth')
          })
          .then(authJson => {
            const auth = JSON.parse(authJson)
            if (auth) {
              req.options.headers.authorization = `Bearer ${auth.jwtToken}`
            }
            next()
          })
      } else {
        next()
      }
    }
  }
])

networkInterface.useAfter([{
  applyAfterware ({ response }, next) {
    if (response.status === 401) {
      logoutOnCanary()
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

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  let store

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      createReducer(),
      initialState,
      composeEnhancers(
        applyMiddleware(...middlewares),
        DevTools.instrument()
      )
    )
  } else {
    store = store = createStore(
      createReducer(),
      initialState,
      composeEnhancers(
        applyMiddleware(...middlewares)
      )
    )
  }



  store.asyncReducers = {}

  api.interceptors.response.use(
    response => {
      return response
    },
    ({ response, ...error }) => {
      if (response && response.status === 401) {
        logoutOnCanary()
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
