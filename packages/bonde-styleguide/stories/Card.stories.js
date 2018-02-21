import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wrapper from './Wrapper'
import { Row, Cell } from '../src/Grid'
import { Title, Button, Card, Text } from '../src'
import * as IconColorful from '../src/IconColorful'

storiesOf('Card', module)
  .addDecorator(story => (
    <Wrapper position='relative' bg='#EEEEEE' padding='15px' width='inherit'>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('Default', () => (
    <Row>
      <Cell size={[4, 4, 6, 6, 12, 12]}>
        <Card
          title='Lorem ipsum'
          minHeight='275px'
          maxHeight='275px'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid loquor de nobis, qui ad
          laudem et ad decus nati, suscepti, instituti sumus? Quod praeceptum quia maius erat,
          quam ut ab homine videretur, idcirco assignatum est deo. Audi, ne longe abeam,
          moriens quid dicat Epicurus, ut intellegas facta eius cum dictis discrepare:
          Epicurus Hermarcho salutem. Duo Reges: constructio interrete. Utrum enim sit
          voluptas in iis rebus, quas primas secundum naturam esse diximus, necne sit ad id,
          quod agimus, nihil interest. Is cum arderet podagrae doloribus visitassetque hominem
          Charmides Epicureus perfamiliaris et tristis exiret, Mane, quaeso, inquit, Charmide
          noster; Etenim si delectamur, cum scribimus, quis est tam invidus, qui ab eo nos
          abducat? An haec ab eo non dicuntur? Nam quod ait sensibus ipsis iudicari voluptatem
          bonum esse, dolorem malum, plus tribuit sensibus, quam nobis leges permittunt,
          cum privatarum litium iudices sumus.
        </Card>
      </Cell>
    </Row>
  ))
  .addWithJSX('centralized content', () => (
    <Row>
      <Cell size={[4, 4, 6, 6, 12, 12]}>
        <Card
          title='Minhas Comunidades'
          paddingY='35px'
          centralized
        >
          <IconColorful.Community size='80' />
          <Text>
            Se juntos causam,<br />
            imagina juntos.
          </Text>
          <Button>Criar comunidade</Button>
        </Card>
      </Cell>

      <Cell size={[4, 4, 6, 6, 12, 12]}>
        <Card
          title='Minhas Mobilizações'
          paddingY='35px'
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
          paddingY='35px'
          centralized
        >
          <center>
            Implement List Component<br />
            ...
          </center>
        </Card>
      </Cell>
    </Row>
  ))
  .addWithJSX('with image', () => (
    <Row>
      <Cell size={[3, 3, 6, 6, 12, 12]}>
        <Card
          title='Trending mobs'
          minHeight='320px'
          maxHeight='320px'
          image='https://goo.gl/hggWmp'
        >
          <Title.H3 margin='.5rem 0'>Cinzas dos Muros</Title.H3>
          <p>Nossos muros têm voz, têm vida.</p>
          <em>Por Minha Sampa</em>
        </Card>
      </Cell>
      <Cell size={[3, 3, 6, 6, 12, 12]}>
        <Card
          minHeight='320px'
          maxHeight='320px'
          image='https://goo.gl/H5aT5B'
        >
          <Title.H3 margin='.5rem 0'>Temer Jamais</Title.H3>
          <p>Bora encher a caixa de email do Temer!</p>
          <em>Por Meu Rio</em>
        </Card>
      </Cell>
      <Cell size={[3, 3, 6, 6, 12, 12]}>
        <Card
          minHeight='320px'
          maxHeight='320px'
          image='https://goo.gl/VpdChy'
        >
          <Title.H3 margin='.5rem 0'>Mulheres Inspiradoras</Title.H3>
          <p>Algumas histórias precisam ser contadas.</p>
          <em>Por Coletivo Feminista</em>
        </Card>
      </Cell>
      <Cell size={[3, 3, 6, 6, 12, 12]}>
        <Card
          minHeight='320px'
          maxHeight='320px'
          image='https://goo.gl/vTkgRb'
        >
          <Title.H3 margin='.5rem 0'>Vegan Já!</Title.H3>
          <p>Todos os seres merecem o seu respeito.</p>
          <em>Por Go Vegan</em>
        </Card>
      </Cell>
    </Row>
  ))
