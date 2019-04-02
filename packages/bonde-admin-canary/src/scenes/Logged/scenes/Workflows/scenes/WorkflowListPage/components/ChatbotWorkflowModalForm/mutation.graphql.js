import gql from 'graphql-tag'

export default gql`
  mutation chatbotCreateWorkflow($name: String!, $message: String!, $configurationId: Int!) {
    chatbotCreateWorkflow(input: {
      name: $name,
      message: $message,
      configurationId: $configurationId
    }) {
      workflow {
        id,
        name,
        lastLevel,
        draft
      }
    }
  }
`