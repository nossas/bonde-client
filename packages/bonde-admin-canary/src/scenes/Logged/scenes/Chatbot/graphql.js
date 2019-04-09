import gql from 'graphql-tag'

export default {
  mutation: {
    createWorkflow: gql`
      mutation CreateWorkflow($name: String!, $message: String!, $configurationId: Int!) {
        createWorkflow(input: {
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
  },
  query: {
    workflow: gql`
      query Workflow($communityId: Int!) {
        workflow(communityId: $communityId) {
          edges {
            node {
              id,
              name,
              lastLevel,
              draft
            }
          }
        }
      }
    `
  }
}