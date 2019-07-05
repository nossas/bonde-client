import React from 'react'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import { CreateFlowModalForm, FlowDataList } from '../../components'
import { I18n } from 'react-i18next'
import PropTypes from 'prop-types'

const Flows = ({ changeCampaign, community, edges }) => {
  // TODO:
  // - add translate

  return (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Title.H2 margin={{ bottom: 10 }}>Chatbot</Title.H2>
        <I18n ns='chatbot'>
          {t => (
            <CreateFlowModalForm t={t} community={community} />
          )}
        </I18n>
      </Flexbox>
      <Title.H5 margin={{ bottom: 25 }}>FLUXOS DE CONVERSA</Title.H5>
      <Grid>
        <Cell size={[12, 12, 12]}>
          <FlowDataList edges={edges} changeCampaign={changeCampaign} />
        </Cell>
      </Grid>
    </Flexbox>
  )
}

Flows.propTypes = {
  changeCampaign: PropTypes.func,
  community: PropTypes.any,
  edges: PropTypes.array
}

export default Flows
