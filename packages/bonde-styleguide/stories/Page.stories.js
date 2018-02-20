import React from 'react'
import { storiesOf } from '@storybook/react'
import { Page } from '../src/Layout'
import Tabs, { Tab } from '../src/Tabs'
import { Text } from '../src'

const PageMenu = () => (
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
    <Page menuComponent={PageMenu}>
      <Text>Welcome to bonde.org</Text>
    </Page>
  ))
