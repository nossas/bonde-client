import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Header, Navbar, Button } from '../src'
import { MainNav, UserNav } from '../src/Navigation'
import Tabs, { Tab } from '../src/Tabs'
import { jsxOptions } from './utils'

const BondeNavbar = () => (
  <Navbar>
    <MainNav />
    <UserNav />
  </Navbar>
)

BondeNavbar.displayName = 'BondeNavbar'

const DashboardNavigation = () => (
  <Tabs>
    <Tab active>Dashboard</Tab>
    <Tab>Mobilizações</Tab>
    <Tab>Comunidade</Tab>
    <Tab>Configurações</Tab>
  </Tabs>
)

DashboardNavigation.displayName = 'DashboardNavigation'

const CreateMobilization = () => (
  <Button onClick={action('[Criar mobilização]')}>
    Criar mobilização
  </Button>
)

CreateMobilization.displayName = 'CreateMobilization'


storiesOf('Header', module)
  .addWithJSX('default', () => (
    <Header
      pageTitle='Nome da comunidade'
      navbar={BondeNavbar}
      actionButton={CreateMobilization}
      tabNavigation={DashboardNavigation}
    />
  ), jsxOptions)
