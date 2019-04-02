import gql from 'graphql-tag'

const MESSAGE_TYPE_DATA = gql`
  fragment MessageFragment on MessageType {
    id,
    text,
    level,
    action
  }
`

export const queryBuilder = (level) => {
  let queryBase = `
    query chatbotWorflowMessages($workflowId: Int!) {
      chatbotWorkflowMessages(workflowId: $workflowId) {
        #QUERY_BUILD_BODY
      }
    }
  `
  Array.from(Array(level).keys()).forEach(i => {
    if (i + 1 == level) {
      queryBase = queryBase.replace('#QUERY_BUILD_BODY', `
        edges {
          node {
            ...MessageFragment
          }
        }
      `)
    } else {
      queryBase = queryBase.replace('#QUERY_BUILD_BODY', `
        edges {
          node {
            ...MessageFragment
            children {
              #QUERY_BUILD_BODY
            }
          }
        }
      `)
    }
  })
  return gql`
    ${queryBase}
    ${MESSAGE_TYPE_DATA}
  `
}

export const workflowListQuery = gql`
  query chatbotWorkflows($communityId: Int!) {
    chatbotWorkflows(communityId: $communityId) {
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