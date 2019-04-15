import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import Tree from 'react-d3-tree'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import queryBuilder from './queryBuilder'


const conversationToTree = (edges) => edges.map(item => {
  if (item.node.children) {
    return { name: item.node.text, children: conversationToTree(item.node.children.edges)}
  }
  return { name: item.node.text }
})


const ConversationFlow = ({ workflow }) => {
  const allMessagesQuery = queryBuilder(Number(workflow.node.lastLevel))

  return (
    <Query query={allMessagesQuery} variables={{ id: workflow.node.id }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error!'
        
        const conversation = data.conversation.edges[0].node.messages.edges
        return <Tree data={conversationToTree(conversation)} />
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