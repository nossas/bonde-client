import { ApolloClient, createNetworkInterface } from 'react-apollo'

const GRAPHQL_URL = process.env.GRAPHQL_URL !== undefined
  ? process.env.GRAPHQL_URL
  : 'http://localhost:3003'

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_URL,
  connectToDevTools: true
})

export default (options = {}) => new ApolloClient({
  networkInterface,
  ...options
})
