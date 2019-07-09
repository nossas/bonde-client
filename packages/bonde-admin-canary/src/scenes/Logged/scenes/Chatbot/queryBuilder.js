import gql from 'graphql-tag'

const MESSAGE_TYPE_DATA = gql`
  fragment MessageFragment on Message {
    id
    text
    level
    kind
  }
`

export default (level) => {
  let queryBase = `
    query ListCampaign ($id: Int!) {
      conversation: campaigns(id: $id) {
        edges {
          node {
            id
            name
            draft
            messages {
              #QUERY_BUILD_BODY
            }
          }
        }
      }
    }
  `
  Array.from(Array(level).keys()).forEach(i => {
    if (i + 1 === level) {
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
