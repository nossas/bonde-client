import gql from 'graphql-tag'

export default {
  mutation: {
    createCampaign: gql`
      mutation CreateCampaign($name: String!, $prefix: String!, $message: String!, $chatbotSettingsId: Int!) {
        chatbotCreateCampaign(input: {
          name: $name,
          prefix: $prefix,
          message: $message,
          chatbotSettingsId: $chatbotSettingsId
        }) {
          campaign {
            id
            name
            draft
          }
        }
      }
    `,
    createMessage: gql`
      mutation CreateMessage($text: String!, $kind: MessageKind!, $parentId: Int!) {
        chatbotCreateMessage(input: {
          text: $text,
          kind: $kind,
          parentId: $parentId,
        }) {
          message {
            id
            text
            level
            kind
            parentId
          }
        }
      }
    `,
    deleteMessage: gql`
      mutation DeleteMessage($id: ID!) {
        chatbotDeleteMessage(messageId: $id) {
          ok
        }
      }
    `
  },
  query: {
    campaigns: gql`
      query ListCampaign($communityId: Int!) {
        campaigns(communityId: $communityId) {
          edges {
            node {
              id
              name
              draft
            }
          }
        }
      }
    `
  }
}
