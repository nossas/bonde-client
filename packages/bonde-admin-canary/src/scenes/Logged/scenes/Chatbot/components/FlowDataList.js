import React from 'react'
import {
  Button,
  DataListCard,
  Flexbox2 as Flexbox,
  SwitchSlider,
  Text,
  Title
} from 'bonde-styleguide'
import PropTypes from 'prop-types'

const DraftButtonRender = (draft) => (
  <SwitchSlider round checked={!draft}>
    <Text>{draft ? 'RASCUNHO' : 'ATIVO'}</Text>
  </SwitchSlider>
)

const NameRender = (name) => (
  <Title.H4>{name}</Title.H4>
)

const ActionRender = ({ data, changeCampaign }) => {
  return (
    <Flexbox horizontal>
      <Button onClick={() => changeCampaign(data)}>Editar</Button>
      <Button flat>Excluir</Button>
    </Flexbox>
  )
}

ActionRender.propTypes = {
  data: PropTypes.any,
  changeCampaign: PropTypes.func
}

const FieldsRender = (changeCampaign, _, data) => (
  <ActionRender data={data} changeCampaign={changeCampaign} />
)

const FlowDataList = ({ edges, changeCampaign }) => {
  return (
    <DataListCard
      picker='node'
      fields={{
        name: { render: NameRender },
        draft: { render: DraftButtonRender },
        id: {
          width: 120,
          render: (_, data) => FieldsRender(changeCampaign, _, data)
        }
      }}
      items={edges}
    />
  )
}

FlowDataList.propTypes = {
  edges: PropTypes.array,
  changeCampaign: PropTypes.func
}

export default FlowDataList
