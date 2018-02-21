import React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from '../src'
import Tabs, { Tab } from '../src/Tabs'
import Wrapper from './Wrapper'

const user = {
  avatar: 'http://via.placeholder.com/35x35?text=U',
  first_name: 'Maria',
  last_name: 'Benatti'
}

storiesOf('Header', module)
  .addDecorator(story => (
    <Wrapper position='relative' width='1200px'>
      {story()}
    </Wrapper>
  ))
  .addWithJSX('default', () => (
    <Header />
  ))
  .addWithJSX('with page title', () => (
    <Header pageTitle='Home' />
  ))
  .addWithJSX('with user', () => (
    <Header user={user} />
  ))
  .addWithJSX('with Tabs', () => (
    <Header>
      <Tabs>
        <Tab active>Dashboard</Tab>
        <Tab>Mobilizações</Tab>
        <Tab>Comunidade</Tab>
        <Tab>Configurações</Tab>
      </Tabs>
    </Header>
  ))
  .addWithJSX('with Tabs and user', () => (
    <Header user={user}>
      <Tabs>
        <Tab active>Dashboard</Tab>
        <Tab>Mobilizações</Tab>
        <Tab>Comunidade</Tab>
        <Tab>Configurações</Tab>
      </Tabs>
    </Header>
  ))
  .addWithJSX('with Tabs, user and page title', () => (
    <Header pageTitle='Nome da Comunidade' user={user}>
      <Tabs>
        <Tab active>Dashboard</Tab>
        <Tab>Mobilizações</Tab>
        <Tab>Comunidade</Tab>
        <Tab>Configurações</Tab>
      </Tabs>
    </Header>
  ))
