import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import Navbar from '../src/Navbar'
import Dropdown, {
  Item as DropdownItem,
  Header as DropdownHeader
} from '../src/Dropdown'
import * as Icon from '../src/Icon'

const displayNameFn = (fn) => fn.displayName || fn

const jsxOptions = { functionValue: displayNameFn }

const MainNav = () => (
  <Dropdown label='Comunidades'>
    <DropdownItem>Minha Sampa</DropdownItem>
    <DropdownItem>Meu Rio</DropdownItem>
    <DropdownItem>Meu Recife</DropdownItem>
  </Dropdown>
)

const UserNav = () => {
  const avatar = 'http://via.placeholder.com/35x35?text=U'
  const fullName = 'Maria Benatti'
  
  return (
    <Dropdown label={fullName} icon={Icon.Sound} width={190}>
      <DropdownHeader>
        <img src={avatar} alt={fullName} />
        <span>{fullName}</span> 
      </DropdownHeader>
      <DropdownItem><Icon.User /> Perfil</DropdownItem>
      <DropdownItem><Icon.Times /> Sair</DropdownItem>
    </Dropdown>
  )
}

storiesOf('Navbar', module)
  .addDecorator(withKnobs)
  .addWithJSX('default', () => (
    <Navbar
      homePageTitle={text('Title', 'Bonde.org')}
      homePageUrl={text('Url', 'http://bonde.org')}
    />
  ), jsxOptions)
  .addWithJSX('with 1 nav', () => (
    <Navbar>
      <MainNav />
    </Navbar>
  ), jsxOptions)
  .addWithJSX('with 2 navs', () => (
    <Navbar>
      <MainNav />
      <UserNav />
    </Navbar>
  ), jsxOptions)
