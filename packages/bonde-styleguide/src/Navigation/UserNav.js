import React from 'react'
import Dropdown, {
  Item as DropdownItem,
  Header as DropdownHeader
} from '../Dropdown'
import Icon from '../Icon'

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

export default UserNav
