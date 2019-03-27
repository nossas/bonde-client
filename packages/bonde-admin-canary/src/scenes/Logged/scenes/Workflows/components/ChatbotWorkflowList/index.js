import React from 'react'
import { Query } from 'react-apollo'
import { DataListCard, SwitchSlider, Text, Title } from 'bonde-styleguide'
import chatbotWorkflowsQuery from './query.graphql'


const DraftButtonRender = (field) => (
  <SwitchSlider round checked={!field}>
    <Text>{field ? 'RASCUNHO' : 'ATIVO'}</Text>
  </SwitchSlider>
)

const NameRender = (field) => (
  <Title.H4>{field}</Title.H4>
)

const ChatbotWorkflowDataList = ({ edges }) => (
  <DataListCard
    fields={{ name: { render: NameRender }, draft: { render: DraftButtonRender } }}
    items={edges.map((obj) => ({...obj.node}))}
  />
)


export default ({ communityId }) => (
  <Query query={chatbotWorkflowsQuery} variables={{ communityId }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      
      if (data.chatbotWorkflows.edges) {
        return (
          <ChatbotWorkflowDataList
            edges={data.chatbotWorkflows.edges}
          />
        )
      }

      return <p>Houve um problema ao carregar a query.</p>
    }}
  </Query>
)