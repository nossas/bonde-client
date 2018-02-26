import React from 'react'
import Dropdown, { Item as DropdownItem } from '../Dropdown'

const MainNav = () => (
  <Dropdown label='Comunidades'>
    <DropdownItem>Minha Sampa</DropdownItem>
    <DropdownItem>Meu Rio</DropdownItem>
    <DropdownItem>Meu Recife</DropdownItem>
  </Dropdown>
)

export default MainNav
