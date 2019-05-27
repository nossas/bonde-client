import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Page, Header } from 'components/PageLogged'
import { Route } from 'services/auth'
import ChatbotAPI from './graphql'
import FlowsScene from './scenes/Flows'
import EditGraphScene from './scenes/EditGraph'


export default withRouter(({ match, history }) => {
  const [campaign, setCampaign] = useState(undefined)

  const handleChangeCampaign = (campaign) => {
    if (campaign !== undefined) {
      setCampaign(campaign)
      history.push(`/admin/${match.params.id}/chatbot/${campaign.node.id}`)
    }
  }

  return (
    <Page renderTitle={() => <Header.Title>BETA</Header.Title>}>
      <Query query={ChatbotAPI.query.campaigns} variables={{ communityId: Number(match.params.id) }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error!!'

          const newProps = {
            edges: data.campaigns.edges,
            changeCampaign: handleChangeCampaign
          }

          return (
            <React.Fragment>
              <Route
                exact
                path={match.url}
                component={(props) => <FlowsScene {...props} {...newProps} />}
              />
              <Route
                path={`${match.url}/:id`}
                component={(props) => <EditGraphScene {...props} {...newProps} campaign={campaign} />}
              />
            </React.Fragment>
          )
        }}
      </Query>
    </Page>
  )
})