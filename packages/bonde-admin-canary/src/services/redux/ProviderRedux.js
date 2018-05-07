import React from 'react'
import { Provider } from 'react-redux'
import { db } from '../session'
import configureStore from './configureStore'

const initialState = {
  auth: {
    user: db.get('user').value()
  }
}

export const store = configureStore(initialState)

export default ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)
