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
import PropTypes from 'prop-types'

const ConversationFlow = ({ campaign }) => {
  const allMessagesQuery = queryBuilder(20)
  const height = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  return (
    <Query query={allMessagesQuery} variables={{ id: campaign.node.id }} fetchPolicy='network-only'>
      {({ loading, error, data }) => {
        if (loading) return <div style={{ width: '100%', height: `${height}px` }}>Loading...</div>
        if (error) return 'Error!'

        const conversation = data.conversation.edges[0].node.messages.edges
        return (
          <ConversationTree
            campaign={campaign}
            conversation={conversation}
          />
        )
      }}
    </Query>
  )
}

ConversationFlow.propTypes = {
  campaign: PropTypes.shape({
    node: PropTypes.shape({
      id: PropTypes.any
    })
  })
}

const EditGraph = ({ changeCampaign, edges, match, campaign }) => {
  useEffect(() => {
    if (!campaign && match.params.id) {
      changeCampaign(edges.filter(i => i.node.id === match.params.id)[0])
    }
  }, [edges, campaign, changeCampaign, match])

  return campaign ? (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Title.H2 margin={{ bottom: 10 }}>{campaign.node.name}</Title.H2>
      </Flexbox>
      <Title.H5 margin={{ bottom: 25 }}>FLUXO DE CONVERSA</Title.H5>
      <Grid>
        <Cell size={[12, 12, 12]}>
          {campaign && <ConversationFlow campaign={campaign} />}
        </Cell>
      </Grid>
    </Flexbox>
  ) : 'Loading...'
}

EditGraph.propTypes = {
  changeCampaign: PropTypes.func,
  edges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  campaign: PropTypes.shape({
    node: PropTypes.shape({
      name: PropTypes.string
    })
  })
}

export default EditGraph
