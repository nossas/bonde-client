import React from 'react'
import { storiesOf } from '@storybook/react'
import { Page } from '../src/Layout'
import Tabs, { Tab } from '../src/Tabs'
import { Header, Text } from '../src'
import Wrapper from './Wrapper'

const ModuleTabMenu = () => (
  <Tabs>
    <Tab>Editar</Tab>
    <Tab active>Configurações</Tab>
  </Tabs>
)

const PageTabMenu = () => (
  <Tabs inverted>
    <Tab active>Informações</Tab>
    <Tab>Mobilizadores</Tab>
    <Tab>Conta</Tab>
    <Tab>Domínios</Tab>
    <Tab>Integrações</Tab>
  </Tabs>
)

storiesOf('Page', module)
  .add('default', () => (
    <Page>
      <Text>Welcome to bonde.org</Text>
    </Page>
  ))
  .add('with menuComponent', () => (
    <Page menuComponent={PageTabMenu}>
      <Text>Welcome to bonde.org</Text>
    </Page>
  ))
  .add('with header', () => (
    <div>
      <Header pageTitle='Respeita as Mina'>
        <ModuleTabMenu />
      </Header>
      <Page menuComponent={PageTabMenu}>
        <Text>Welcome to bonde.org</Text>
      </Page>
    </div>
  ))
