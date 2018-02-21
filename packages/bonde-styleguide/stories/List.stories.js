import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Wrapper from './Wrapper'
import { Preformatted, Hightlight } from './Icon.stories'
import { Row, Cell } from '../src/Grid'
import { Title } from '../src'
import List from '../src/List'

storiesOf('List', module)
  .addDecorator(story => (
    <Wrapper position='relative' padding='15px' width='inherit'>
      {story()}
    </Wrapper>
  ))
  .add('Default', () => (
    <div>
      <Title.H1>List</Title.H1>
      <p>
        Components that render items in list style. The default style is demonstrated below:
      </p>

      <Title.H2>Prop Types</Title.H2>

      <Preformatted>
        <Hightlight code={
`List.Item.propTypes = {
  label: string.isRequired,
  description: string.isRequired,
  avatar: string,
  noavatar: bool
}`
        } />
      </Preformatted>

      <Title.H2>Example</Title.H2>

      <List>
        <List.Item
          label='Apoie a Minha Sampa'
          description='Página de doação da Minha Sampa'
        />
        <List.Item
          label='CPI do Ônibus pra valer'
          description='Prorrogar a CPI dos ônibus por mais quatro meses'
        />
      </List>

      <Preformatted>
        <Hightlight code={
`import List from 'bonde-styleguide/List'

<List>
  <List.Item
    label='Apoie a Minha Sampa'
    description='Página de doação da Minha Sampa'
  />
  <List.Item
    label='CPI do Ônibus pra valer'
    description='Prorrogar a CPI dos ônibus por mais quatro meses'
  />
</List>`
        } />
      </Preformatted>
    </div>
  ))
  .add('avatar', () => (
    <div>
      <Title.H1>List: avatar</Title.H1>
      <p>
        Render list item with the avatar image url passed as prop to component.
      </p>

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

      <Preformatted>
        <Hightlight code={
`import { Row, Cell } from 'bonde-styleguide/Grid'
import List from 'bonde-styleguide/List'

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
</Row>`
        } />
      </Preformatted>

      <Title.H2>Without Avatar</Title.H2>

      <p>
        If you do not want to render the avatar in the list item component, just pass
        the <b>noavatar</b> prop to the list item component. See example below:
      </p>

      <List>
        <List.Item
          label='Apoie a Minha Sampa'
          description='Página de doação da Minha Sampa'
          noavatar
        />
        <List.Item
          label='CPI do Ônibus pra valer'
          description='Prorrogar a CPI dos ônibus por mais quatro meses'
          noavatar
        />
      </List>

      <Preformatted>
        <Hightlight code={
`import List from 'bonde-styleguide/List'

<List>
  <List.Item
    label='Apoie a Minha Sampa'
    description='Página de doação da Minha Sampa'
    noavatar
  />
  <List.Item
    label='CPI do Ônibus pra valer'
    description='Prorrogar a CPI dos ônibus por mais quatro meses'
    noavatar
  />
</List>`
        } />
      </Preformatted>
    </div>
  ))
