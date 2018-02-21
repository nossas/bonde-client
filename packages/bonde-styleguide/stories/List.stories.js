import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { Preformatted, Hightlight, Code } from './Icon.stories'
import { Row, Cell } from '../src/Grid'
import { Title } from '../src'
import List from '../src/List'

const LinkComponent = styled.div.attrs({
  onClick: () => action('[List: click] LinkComponent onClick')
})`
  background-color: #efefef;
  cursor: pointer;
  transition: 200ms box-shadow;

  &:hover { box-shadow: inset 0 0 15px 0 rgba(0,0,0,.3) }
`

const optionsAddonJSX = {
  showDefaultProps: false,
  showFunctions: false
}

storiesOf('List', module)
  .addDecorator(story => (
    <Wrapper position='relative' padding='15px' width='inherit'>
      {story()}
    </Wrapper>
  ))

  .addWithJSX('default', () => (
    <List>
      <List.Item />
      <List.Item label='Apoie a Minha Sampa' />
      <List.Item
        label='CPI do Ônibus pra valer'
        description='Prorrogar a CPI dos ônibus por mais quatro meses'
      />
    </List>
  ), optionsAddonJSX)

  .addWithJSX('avatar', () => (
    <Row>
      <Cell size={[4, 4, 6, 6, 12, 12]}>
        <List>
          <List.Item
            avatar='https://s3.amazonaws.com/hub-central/uploads/1466539647_share.001.png'
            label='Apoie a Minha Sampa'
            description='Página de doação da Minha Sampa'
          />
          <List.Item
            avatar='https://s3.amazonaws.com/hub-central/uploads/1510696294_share.png'
            label='CPI do Ônibus pra valer'
            description='Prorrogar a CPI dos ônibus por mais quatro meses'
          />
        </List>
      </Cell>
      <Cell size={[4, 4, 6, 6, 12, 12]}>
        <List>
          <List.Item
            avatar='https://s3.amazonaws.com/hub-central/uploads/1483477621_sindrome_de_down16.jpg'
            label='Por escolas inclusivas de verdade no Rio'
            description={
              'Pelo direito das 13mil crianças com deficiência  na rede municipal ' +
              'aos agentes de apoio à educação especial'
            }
          />
          <List.Item
            avatar='https://s3.amazonaws.com/hub-central/uploads/1461673081_MapJam_CompFacebook.png'
            label='MapJam: Mapeando Iniciativas Colaborativas no Rio'
            description={
              'Que tal mapear as iniciativas colaborativas e públicas da cidade do Rio ' +
              'de Janeiro e disponibilizar essas informações para todo mundo? O MapJam é ' +
              'um evento fomentado pelo Shareable (www.shareable.net) onde várias cidades ' +
              'so mundo se juntam em um mês e mapeiam os projetos colaborativos da sua ' +
              'comunidade. No final tudo isso é colocado em um único mapa disponibilizado online.'
            }
          />
        </List>
      </Cell>
    </Row>
  ), optionsAddonJSX)

  .addWithJSX('noavatar', () => (
    <List>
      <List.Item
        label='Apoie a Minha Sampa'
        description='Página de doação da Minha Sampa'
        noavatar={true}
      />
      <List.Item
        label='CPI do Ônibus pra valer'
        description='Prorrogar a CPI dos ônibus por mais quatro meses'
        noavatar
      />
    </List>
  ), optionsAddonJSX)

  .addWithJSX('onClick', () => (
    <List>
      <List.Item
        label='Apoie a Minha Sampa'
        description='Página de doação da Minha Sampa'
        onClick={action('[List: click] onClick prop')}
      />
    </List>
  ), optionsAddonJSX)

  .addWithJSX('href', () => (
    <List>
      <List.Item
        label='Apoie a Minha Sampa'
        description='Página de doação da Minha Sampa'
        href='https://google.com'
        target='_blank'
      />
    </List>
  ), optionsAddonJSX)

  .addWithJSX('LinkComponent', () => (
    <List>
      <List.Item
        label='Apoie a Minha Sampa'
        description='Página de doação da Minha Sampa'
        LinkComponent={LinkComponent}
      />
    </List>
  ), optionsAddonJSX)
