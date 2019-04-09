import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { Page, Header } from 'components/PageLogged'
import { Route } from 'services/auth'
import ChatbotAPI from './graphql'
import FlowsScene from './scenes/Flows'
import EditGraphScene from './scenes/EditGraph'


export default ({ match }) => {
  const community = { id: 1, name: "Bonde"}
  const [workflow, setWorkflow] = useState(undefined)

  const handleChangeWorkflow = (workflow) => {
    setWorkflow(workflow)
  }

  return (
    <Page renderTitle={() => <Header.Title>{community.name}</Header.Title>}>
      <Query query={ChatbotAPI.query.workflow} variables={{ communityId: community.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error!!'

          const newProps = {
            edges: data.workflow.edges,
            changeWorkflow: handleChangeWorkflow
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
                component={(props) => <EditGraphScene {...props} {...newProps} workflow={workflow} />}
              />
            </React.Fragment>
          )
        }}
      </Query>
    </Page>
  )
}