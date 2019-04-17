import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import { ConversationTree } from '../../components'
import queryBuilder from '../../queryBuilder'

const ConversationFlow = ({ workflow }) => {
  const allMessagesQuery = queryBuilder(20)
  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight

  return (
    <Query query={allMessagesQuery} variables={{ id: workflow.node.id }} fetchPolicy='network-only'>
      {({ loading, error, data }) => {
        if (loading) return <div style={{ width: '100%', height: `${height}px` }}>Loading...</div>
        if (error) return 'Error!'

        const conversation = data.conversation.edges[0].node.messages.edges
        return (
          <ConversationTree
            workflow={workflow}
            conversation={conversation}
          />
        )
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
