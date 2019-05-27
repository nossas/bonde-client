import React from 'react'
import {
  Cell,
  Flexbox2 as Flexbox,
  Grid,
  Title
} from 'bonde-styleguide'
import { CreateFlowModalForm, FlowDataList } from '../../components'

export default ({ changeCampaign, community, edges }) => {
  // TODO:
  // - add translate

  return (
    <Flexbox vertical>
      <Flexbox horizontal spacing='between'>
        <Title.H2 margin={{ bottom: 10 }}>Chatbot</Title.H2>
        <CreateFlowModalForm community={community} />
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