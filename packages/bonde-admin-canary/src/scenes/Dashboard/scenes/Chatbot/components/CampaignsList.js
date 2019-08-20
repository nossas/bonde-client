import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Flexbox2 as Flexbox,
  DataListCard,
  SwitchSlider,
  Text,
  Title,
  Grid,
  Cell,
  Icon
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { updateChatbotCampaignsMutation, chatbotCampaignsQuery } from '../graphql'

const NameField = ({ value }) => (
  <Title.H4>{value}</Title.H4>
)

NameField.propTypes = {
  value: PropTypes.string
}

const StatusButtonField = ({ value, row }) => (
  <Mutation
    mutation={updateChatbotCampaignsMutation}
    refetchQueries={[{ query: chatbotCampaignsQuery, variables: { chatbotId: row.chatbot_id } }]}
  >
    {(mutation) => (
      <SwitchSlider
        round
        checked={value === 'active'}
        onChange={() => {
          const variables = {
            name: row.name,
            prefix: row.prefix,
            diagram: row.diagram,
            id: row.id,
            status: value === 'active' ? 'inactive' : 'active'
          }
          mutation({ variables })
            .then((data) => {
            // TODO: dispatch notify
            })
        }}
      >
        <Text>{value === 'active' ? 'ATIVO' : 'INATIVO'}</Text>
      </SwitchSlider>
    )}
  </Mutation>
)

StatusButtonField.propTypes = {
  value: PropTypes.string,
  row: PropTypes.object
}

const MenuField = withRouter(({ match, history, value }) => {
  return (
    <Flexbox horizontal>
      <Button
        flat
        onClick={() => {
          history.push(`${match.url}/campaign/${value}`)
        }}
      >
        <Icon name='pencil' /> Editar
      </Button>
      <Button flat><Icon name='trash' /> Excluir</Button>
    </Flexbox>
  )
})

MenuField.propTypes = {
  value: PropTypes.string
}

const fields = {
  name: { label: 'Nome do fluxo', render: NameField },
  status: { label: 'Status', render: StatusButtonField },
  id: { label: 'Ações', render: MenuField, width: 500 }
}

const CampaignsList = ({ chatbotCampaigns, match }) => {
  return (
    <Grid gap={0}>
      <Cell size={[2, 2, 2]}>
        <Flexbox horizontal spacing='between'>
          <Button flat active>TODOS</Button>
          <Button flat>ATIVOS</Button>
          <Button flat>INATIVOS</Button>
        </Flexbox>
      </Cell>
      <Cell align='right' size={[10, 10, 10]}>
        <ButtonLink to={`${match.url}/campaign/new`}>Novo fluxo</ButtonLink>
      </Cell>
      <Cell size={[12, 12, 12]}>
        <DataListCard
          border='separate'
          fields={fields}
          items={chatbotCampaigns}
        />
      </Cell>
    </Grid>
  )
}

CampaignsList.defaultProps = {
  chatbotCampaigns: []
}

CampaignsList.propTypes = {
  chatbotCampaigns: PropTypes.array,
  match: PropTypes.object
}

export default CampaignsList
