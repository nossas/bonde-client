import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wrapper from './Wrapper'
import { Preformatted, Hightlight } from './Icon.stories'
import { Row, Cell } from '../src/Grid'
import { Title, Button } from '../src'
import * as IconColorful from '../src/IconColorful'
import Card from '../src/Card'

const Text = styled.span`
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`

storiesOf('Card', module)
  .addDecorator(story => (
    <Wrapper position='relative' bg='#EEEEEE' padding='15px' width='inherit'>
      {story()}
    </Wrapper>
  ))
  .add('centralized', () => (
    <div>
      <Title.H1>Card: centralized content</Title.H1>

      <Row>
        <Cell size={[4, 4, 6, 6, 12, 12]}>
          <Card
            title='Minhas Comunidades'
            padding='35px'
            centralized
          >
            <IconColorful.Community size='80' />
            <Text>
              Se juntos causam,<br />
              imagina juntos.
            </Text>
            <Button onClick={action('onClick: Criar Comunidade Button')}>
              Criar comunidade
            </Button>
          </Card>
        </Cell>

        <Cell size={[4, 4, 6, 6, 12, 12]}>
          <Card
            title='Minhas Mobilizações'
            padding='35px'
            centralized
          >
            <IconColorful.Mobilization size='80' />
            <Text>
              Crie uma comunidade<br />
              pra começar a mobilizar.
            </Text>
            <Button disabled>Criar mobilização</Button>
          </Card>
        </Cell>

        <Cell size={[4, 4, 6, 6, 12, 12]}>
          <Card
            title='Notificações'
            padding='35px'
            centralized
          >
            <center>
              Implement List Component<br />
              ...
            </center>
          </Card>
        </Cell>
      </Row>

      <Preformatted>
        <Hightlight code={
`import { Title, Button } from 'bonde-styleguide'
import { Row, Cell } from 'bonde-styleguide/Grid'
import * as IconColorful from 'bonde-styleguide/IconColorful'
import Card from 'bonde-styleguide/Card'

<Row>
  <Cell size={[4, 4, 6, 6, 12, 12]}>
    <Card
      title='Minhas Comunidades'
      padding='35px'
      centralized
    >
      <IconColorful.Community size='80' />
      <Text>
        Se juntos causam,<br />
        imagina juntos.
      </Text>
      <Button onClick={action('onClick: Criar Comunidade Button')}>
        Criar comunidade
      </Button>
    </Card>
  </Cell>

  <Cell size={[4, 4, 6, 6, 12, 12]}>
    <Card
      title='Minhas Mobilizações'
      padding='35px'
      centralized
    >
      <IconColorful.Mobilization size='80' />
      <Text>
        Crie uma comunidade<br />
        pra começar a mobilizar.
      </Text>
      <Button disabled>Criar mobilização</Button>
    </Card>
  </Cell>

  <Cell size={[4, 4, 6, 6, 12, 12]}>
    <Card
      title='Notificações'
      padding='35px'
      centralized
    >
      <center>
        Implement List Component<br />
        ...
      </center>
    </Card>
  </Cell>
</Row>`
        } />
      </Preformatted>
    </div>
  ))
