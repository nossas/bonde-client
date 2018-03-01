import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import { Row, Cell } from '../src/Grid'
import Feed from '../src/Feed'
import {
  DataListTable,
  DataListRow,
  DataListCol,
  LinkShowAll
} from '../src/DataList'
import {
  Assets,
  Button,
  Card,
  Container,
  Image,
  IconColorful,
  Title,
  Text,
  Number,
  Page,
  ProgressRanking
} from '../src'
import ScrollBox from '../src/Card/ScrollBox'
import { jsxOptions } from './utils'

const Grid = ({ children, size }) => (
  <Row>
    <Cell size={[size]}>
      {children}
    </Cell>
  </Row>
)

const numberOpts = {
  range: true,
  max: 3000,
  min: 1
}

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <Page bgColor='#ededee'>
      <div style={{ paddingBottom: '100%' }}>
        {story()}
      </div>
    </Page>
  ))
  .addWithJSX('Minhas comunidades', () => (
    <Grid size={4}>
      <Card
        title={text('Title', 'Minhas comunidades')}
        minHeight={number('Min. height', 274)}
        middle
      >
        <Container padding={{ x: 82 }} vertical center>
          <IconColorful.Community size={80} />
          <Title.H3 margin={{ top: 10, bottom: 22 }} align='center'>
            Se juntos já causam, imagina juntos.
          </Title.H3>
          <Button>Criar comunidade</Button>
        </Container>
      </Card>
    </Grid>
  ))
  .addWithJSX('Notificações', () => (
    <Grid size={4}>
      <Card
        title={text('Title', 'Notificações')}
        minHeight={number('Min. height', 274)}
      >
        <Feed>
          <Feed.Item
            date={new Date}
            text='Juntos causamos mais! Por isso, o primeiro passo é criar uma comunidade.'
          />
          <Feed.Item
            date={new Date().setMinutes(new Date().getMinutes() - 1)}
            text={
              'Esse é seu Bonde, Maria! Bem-vinda! Qualquer dúvida é só clicar em ' +
              '"ajuda eu" ali embaixo. #tamojunto'
            }
          />
        </Feed>
      </Card>
    </Grid>
  ))
  .addWithJSX('Trending mobs', () => (
    <Grid size={3}>
      <Card
        title={text('Title', 'Treending mobs')}
        minHeight={number('Min. height', 320)}
      >
        <Image src='https://goo.gl/hggWmp' height={185} />
        <Container padding={{ x: 16, y: 14 }}>
          <Title.H3>Cinzas dos Muros</Title.H3>
          <Text
            fontSize={16}
            lineHeight={1.31}
            color='#4a4a4a'
            margin={{ y: 8 }}
          >
            Nossos muros têm voz, têm vida.
          </Text>
          <Text fontSize={13} lineHeight={1.85} color='#4a4a4a'>
            Por Minha Sampa
          </Text>
        </Container>
      </Card>
    </Grid>
  ))
  .addWithJSX('Pressões', () => (
    <Grid size={2}>
      <Card
        title={text('Title', 'Pressões')}
        minHeight={number('Min. height', 110)}
        bottom
      >
        <Container padding={{ y: 14, x: 19 }}>
          <Number
            icon={IconColorful.Greeting}
            value={34}
          />
        </Container>
      </Card>
    </Grid>
  ), jsxOptions)
  .addWithJSX('Localização', () => (
    <Grid size={4}>
      <Card
        title={text('Title', 'Localização')}
        minHeight={number('Min. height', 274)}
        middle
      >
        <Container padding={{ x: 24 }} horizontal center>
          <ProgressRanking
            trackColor='#eeeeee'
            color='#ee0099'
            maxValue={3000}
            width={number('Progress width', 110)}
          >
            <ProgressRanking.Item
              label='São Paulo'
              value={number('São Paulo', 2361, numberOpts)}
            />
            <ProgressRanking.Item
              label='Rio de Janeiro'
              value={number('Rio de Janeiro', 1522, numberOpts)}
            />
            <ProgressRanking.Item
              label='Curtiba'
              value={number('Curitiba', 654, numberOpts)}
            />
            <ProgressRanking.Item
              label='Recife'
              value={number('Recife', 322, numberOpts)}
            />
          </ProgressRanking>
          <Assets.BrazilMap
            size={number('BrazilMap size', 170)}
          />
        </Container>
      </Card>
    </Grid>
  ))
  .addWithJSX('Top 5 Mobs', () => (
    <Grid size={4}>
      <Card
        title={text('Title', 'Top 5 Mobs')}
        minHeight={number('Min. height', 274)}
        middle
      >
        <Container padding={{ x: 27 }} horizontal bottom>
          <ProgressRanking
            trackColor='#fff'
            maxValue={2450}
            width={number('Progress width', 200)}
          >
            <ProgressRanking.Item
              label='Existe amor em SP'
              value={number('Existe amor em SP', 2450, numberOpts)}
            />
            <ProgressRanking.Item
              label='Somos toda Olga'
              value={number('Somos toda Olga', 1602, numberOpts)}
            />
            <ProgressRanking.Item
              label='Respeita as Mina'
              value={number('Respeita as Mina', 967, numberOpts)}
            />
            <ProgressRanking.Item
              label='Empodera!'
              value={number('Empodera!', 901, numberOpts)}
            />
            <ProgressRanking.Item
              label='Sem FiuFiu'
              value={number('Sem FiuFiu', 610, numberOpts)}
            />
          </ProgressRanking>
          <IconColorful.Mobilization size={78} />
        </Container>
      </Card>
    </Grid>
  ))
  .addWithJSX('Atividades recentes', () => (
    <Grid size={6}>
      <Card
        title={text('Title', 'Atividades recentes')}
        minHeight={number('Min. height', 274)}
      > 
        <ScrollBox>
          <DataListTable>
            <DataListRow>
              <DataListCol>
                <Text fontSize={14}>Susan Schwartz</Text>
              </DataListCol>
              <DataListCol>
                <Text fontSize={14}>george.lindgren@hotmail.com</Text>
              </DataListCol>
              <DataListCol align='left'>
                <Text fontSize={14}>{`23/10 às 14h`}</Text>
              </DataListCol>
            </DataListRow>
            <DataListRow>
              <DataListCol>
                <Text fontSize={14}>Mattie Cunningham</Text>
              </DataListCol>
              <DataListCol>
                <Text fontSize={14}>graciela_rath@lakin.ca</Text>
              </DataListCol>
              <DataListCol align='left'>
                <Text fontSize={14}>{`23/10 às 14h`}</Text>
              </DataListCol>
            </DataListRow>
            <DataListRow>
              <DataListCol>
                <Text fontSize={14}>Carrie Barton</Text>
              </DataListCol>
              <DataListCol>
                <Text fontSize={14}>abdiel.renner@jorge.biz</Text>
              </DataListCol>
              <DataListCol align='left'>
                <Text fontSize={14}>{`23/10 às 14h`}</Text>
              </DataListCol>
            </DataListRow>
            <DataListRow>
              <DataListCol>
                <Text fontSize={14}>Jeff Rowe</Text>
              </DataListCol>
              <DataListCol>
                <Text fontSize={14}>elias_prosacco@boyle.com</Text>
              </DataListCol>
              <DataListCol align='left'>
                <Text fontSize={14}>{`23/10 às 14h`}</Text>
              </DataListCol>
            </DataListRow>
            <DataListRow>
              <DataListCol>
                <Text fontSize={14}>Owen Padilla</Text>
              </DataListCol>
              <DataListCol>
                <Text fontSize={14}>ignatius.connelly@yahoo.com</Text>
              </DataListCol>
              <DataListCol align='left'>
                <Text fontSize={14}>{`23/10 às 14h`}</Text>
              </DataListCol>
            </DataListRow>
          </DataListTable>
        </ScrollBox>
        <Container right padding={{ top: 9, bottom: 17, right: 26 }}>
          <LinkShowAll>{text('Texto ver todos', 'Ver todos')}</LinkShowAll>
        </Container>
      </Card>
    </Grid> 
  ), jsxOptions)
