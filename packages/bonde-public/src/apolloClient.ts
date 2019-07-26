import 'isomorphic-fetch'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import getConfig from 'next/config'
import { InMemoryCache } from 'apollo-cache-inmemory'

const link = createHttpLink({
  uri: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel'
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})
