import React from 'react'
import { Provider } from 'react-redux'
import { db } from 'services/session'
import configureStore from './configureStore'
import PropTypes from 'prop-types'

const initialState = {
  auth: {
    user: db.get('user').value()
  }
}

export const store = configureStore(initialState)

const ProviderRedux = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

ProviderRedux.propTypes = {
  children: PropTypes.node
}

export default ProviderRedux
