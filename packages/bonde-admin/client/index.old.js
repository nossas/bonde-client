import 'babel-polyfill'
import { trigger } from 'redial'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import match from 'react-router/lib/match'
import browserHistory from 'react-router/lib/browserHistory'
import { configureStore, client } from './store'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import Raven from 'raven-js'

const __PROD__ = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
const __TEST__ = process.env.NODE_ENV === 'test'

if (__PROD__ || __TEST__) {
  Raven.config(process.env.SENTRY_DSN_PUBLIC).install()
}

const initialState = window.INITIAL_STATE || {}

// Set up React-Intl
addLocaleData([...pt, ...es, ...en])
const { intl: { currentLocale, messages: localeMessages } } = initialState
const locale = currentLocale
const messages = localeMessages[currentLocale]
const intlProvider = new IntlProvider({ locale, messages })
const { intl } = intlProvider.getChildContext()

// Set up Redux store
const store = configureStore(initialState, { intl })
const { dispatch, getState } = store

const container = document.getElementById('root')

const render = () => {
  const { pathname, search, hash } = window.location
  const location = `${pathname}${search}${hash}`

  // We need to have a root route for HMR to work.
  const createRoutes = require('../routes').default
  const routes = createRoutes(store)

  // Pull child routes using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    ReactDOM.render(
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ApolloProvider store={store} client={client()}>
            <Router
              routes={routes}
              history={browserHistory}
              key={Math.random()}
            />
          </ApolloProvider>
        </Provider>
      </IntlProvider>,
      container
    )
  })

  return browserHistory.listen(location => {
    // Match routes based on location object:
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) console.log(error)

      let locals = {
        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
        getState
      }
      let components

      if (renderProps) {
        // Get array of route handler components:
        components = renderProps.components

        // Define locals to be provided to all lifecycle hooks:
        locals = {...locals,
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,
          host: window.location.host
        }
      }

      // Don't fetch data for initial route, server has already done the work:
      if (window.INITIAL_STATE) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.INITIAL_STATE
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals)
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals)
    })
  })
}

const unsubscribeHistory = render()

if (module.hot) {
  module.hot.accept('../routes', () => {
    unsubscribeHistory()
    setTimeout(render)
  })
}
