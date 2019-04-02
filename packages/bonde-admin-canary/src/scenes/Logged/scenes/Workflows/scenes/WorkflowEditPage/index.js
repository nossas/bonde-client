import React from 'react'
import { Query } from 'react-apollo'
import { graphqlApi } from 'services/graphql'
import {
  Button,
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import { queryBuilder, workflowListQuery } from './query.graphql'


const TreeView = ({ edges }) => (
  <ul>
  {edges.map(obj => (
    <li key={obj.node.id}>
      <p>{obj.node.text}</p>
      {obj.node.children && <TreeView edges={obj.node.children.edges} />}
    </li>
  ))}
  </ul>
)


const ConversationFlow = ({ workflow }) => (
  <Query
    query={queryBuilder(Number(workflow.lastLevel))}
    variables={{ workflowId: workflow.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      
      if (data.chatbotWorkflowMessages.edges) {
        return (
          <TreeView edges={data.chatbotWorkflowMessages.edges} />
        )
      }

      return <p>Houve um problema ao carregar a query.</p>
    }}
  </Query>
)


export default class extends React.Component {

  getWorkflow () {
    const { community, match: { params } } = this.props
    const { chatbotWorkflows } = graphqlApi.readQuery({
      query: workflowListQuery,
      variables: { communityId: community.id }
    })
    const flow = chatbotWorkflows.edges.filter(p => p.node.id === params.flowId)[0]
    return flow.node
  }

  render () {
    const { community, match: { params } } = this.props
    return (
      <Flexbox vertical>
        <Flexbox horizontal spacing='between'>
          <Title.H2 margin={{ bottom: 10 }}>NOME DO FLUXO</Title.H2>
        </Flexbox>
        <Title.H5 margin={{ bottom: 25 }}>FLUXOS DE CONVERSA</Title.H5>
        <Grid>
          <Cell size={[12, 12, 12]}>
            <ConversationFlow workflow={this.getWorkflow()} />
          </Cell>
        </Grid>
      </Flexbox>
    )
  }
}