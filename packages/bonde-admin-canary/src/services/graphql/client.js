import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AuthAPI } from '../auth'

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = AuthAPI.getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
