import React from 'react'
import { Query } from 'react-apollo'
import {
  Button,
  DataListCard,
  Flexbox2 as Flexbox,
  SwitchSlider,
  Text,
  Title
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import chatbotWorkflowsQuery from './query.graphql'


const DraftButtonRender = (draft) => (
  <SwitchSlider round checked={!draft}>
    <Text>{draft ? 'RASCUNHO' : 'ATIVO'}</Text>
  </SwitchSlider>
)

const NameRender = (name) => (
  <Title.H4>{name}</Title.H4>
)

const ActionRender = (id) => (
  <Flexbox horizontal>
    <ButtonLink to={`/admin/chatbot/${id}/flow`}>Editar</ButtonLink>
    <Button flat>Excluir</Button>
  </Flexbox>
)

const ChatbotWorkflowDataList = ({ edges }) => (
  <DataListCard
    fields={{
      name: { render: NameRender },
      draft: { render: DraftButtonRender },
      id: { width: 120, render: ActionRender }
    }}
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