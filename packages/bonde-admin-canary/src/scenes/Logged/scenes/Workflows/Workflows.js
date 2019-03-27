import React from 'react'
import { Grid, Cell, Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Auth } from 'services/auth'
import { Page, Header } from 'components/PageLogged'
import { ChatbotWorkflowList } from './components'

const COMMUNITY = { id: 1, name: 'Bonde' }

export default class extends React.Component {
  render () {
    return (
      <Auth>
        {({ user }) => (
          <Page
            renderTitle={() => (<Header.Title>{COMMUNITY.name}</Header.Title>)}
          >
            <Flexbox vertical>
              <Title.H2 margin={{ bottom: 10 }}>Chatbot</Title.H2>
              <Title.H5 margin={{ bottom: 25 }}>FLUXOS DE CONVERSA</Title.H5>
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <ChatbotWorkflowList communityId={COMMUNITY.id} />
                </Cell>
              </Grid>
            </Flexbox>
          </Page>
        )}
      </Auth>
    )
  }
}