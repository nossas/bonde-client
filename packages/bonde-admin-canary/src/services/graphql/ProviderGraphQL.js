import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import PropTypes from 'prop-types'

const ProviderGraphQL = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

ProviderGraphQL.propTypes = {
  children: PropTypes.node
}

export default ProviderGraphQL
