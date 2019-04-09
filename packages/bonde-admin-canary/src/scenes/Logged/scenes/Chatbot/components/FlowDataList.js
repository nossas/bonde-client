import React from 'react'
import {
  Button,
  DataListCard,
  Flexbox2 as Flexbox,
  SwitchSlider,
  Text,
  Title
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'


const DraftButtonRender = (draft) => (
  <SwitchSlider round checked={!draft}>
    <Text>{draft ? 'RASCUNHO' : 'ATIVO'}</Text>
  </SwitchSlider>
)

const NameRender = (name) => (
  <Title.H4>{name}</Title.H4>
)

const ActionRender = (id) => (
  <Flexbox horizontal>
    <ButtonLink to={`/admin/chatbot/${id}`}>Editar</ButtonLink>
    <Button flat>Excluir</Button>
  </Flexbox>
)

export default ({ edges }) => {

  return (
    <DataListCard
      fields={{
        name: { render: NameRender },
        draft: { render: DraftButtonRender },
        id: { width: 120, render: ActionRender }
      }}
      items={edges.map((obj) => ({...obj.node}))}
    />
  )
}