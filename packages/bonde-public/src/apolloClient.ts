import 'isomorphic-fetch'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import getConfig from 'next/config'
import { InMemoryCache } from 'apollo-cache-inmemory'

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({
  uri: publicRuntimeConfig.domainApiGraphql || 'http://api-v2.bonde.devel'
})

// const authLink = setContext((_, { headers }) => {
//   const hasuraToken = publicRuntimeConfig.hasuraSecret || 'segredo123'

//   return {
//     headers: {
//       ...headers,
//       'x-hasura-admin-secret': hasuraToken
//     }
//   }
// })

const cache = new InMemoryCache()

export default new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache,
  connectToDevTools: true
})
