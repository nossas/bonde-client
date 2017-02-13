import React from 'react'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'

import {
  actions as authActions,
  selectors as authSelectors
} from '../../authenticate/redux'

import App from './app'

const hooks = {
  fetch: ({ dispatch, getState }) => {
    if (!authSelectors(getState()).isLoaded()) {
      dispatch(authActions.load())
    }
  }
}

export default provideHooks(hooks)(App)
