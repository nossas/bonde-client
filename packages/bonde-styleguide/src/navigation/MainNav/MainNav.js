import React from 'react'
import Dropdown from '../../navigation/Dropdown/Dropdown'
import DropdownItem from '../../navigation/DropdownItem/DropdownItem'

const MainNav = () => (
  <Dropdown label='Comunidades'>
    <DropdownItem>Minha Sampa</DropdownItem>
    <DropdownItem>Meu Rio</DropdownItem>
    <DropdownItem>Meu Recife</DropdownItem>
  </Dropdown>
)

export default MainNav
