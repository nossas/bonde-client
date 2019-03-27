import React from 'react'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'
import { ChatbotWorkflowList, ChatbotWorkflowModalForm } from './components'

const COMMUNITY = { id: 1, name: 'Bonde' }

export default class extends React.Component {
  render () {
    return (
      <Page renderTitle={() => (<Header.Title>{COMMUNITY.name}</Header.Title>)}>
        <Flexbox vertical>
          <Flexbox horizontal spacing='between'>
            <Title.H2 margin={{ bottom: 10 }}>Chatbot</Title.H2>
            <ChatbotWorkflowModalForm />
          </Flexbox>
          <Title.H5 margin={{ bottom: 25 }}>FLUXOS DE CONVERSA</Title.H5>
          <Grid>
            <Cell size={[12, 12, 12]}>
              <ChatbotWorkflowList communityId={COMMUNITY.id} />
            </Cell>
          </Grid>
        </Flexbox>
      </Page>
    )
  }
}