import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.GRAPH_URL || 'http://localhost:3001/graphql'
})

export default client
