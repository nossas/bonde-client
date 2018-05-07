import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './client'

export default ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)
