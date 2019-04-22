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
    `,
    createWorkflowMessage: gql`
      mutation CreateWorkflowMessage($text: String!, $action: MessageTypeAction!, $parentId: Int!) {
        createWorkflowMessage(input: {
          text: $text,
          action: $action,
          parentId: $parentId,
        }) {
          message {
            id,
            text,
            level,
            action,
            parentId
          }
        }
      }
    `,
    deleteWorkflowMessage: gql`
      mutation DeleteWorkflowMessage($id: ID!) {
        deleteWorkflowMessage(messageId: $id) {
          ok
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