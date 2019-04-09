import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import queryBuilder from './queryBuilder'


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


const ConversationFlow = ({ workflow }) => {
  const allMessagesQuery = queryBuilder(Number(workflow.node.lastLevel))

  return (
    <Query query={allMessagesQuery} variables={{ id: workflow.node.id }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error!'
        
        const conversation = data.conversation.edges[0].node
        return <TreeView edges={conversation.messages.edges} />
      }}
    </Query>
  )
}


export default ({ changeWorkflow, edges, match, workflow }) => {
  useEffect(() => {
    if (!workflow && match.params.id) {
      changeWorkflow(edges.filter(i => i.node.id === match.params.id)[0])
    }
  }, [edges, workflow])

  return (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Title.H2 margin={{ bottom: 10 }}>NOME DO FLUXO</Title.H2>
      </Flexbox>
      <Title.H5 margin={{ bottom: 25 }}>FLUXOS DE CONVERSA</Title.H5>
      <Grid>
        <Cell size={[12, 12, 12]}>
          {workflow && <ConversationFlow workflow={workflow} />}
        </Cell>
      </Grid>
    </Flexbox>
  )
}