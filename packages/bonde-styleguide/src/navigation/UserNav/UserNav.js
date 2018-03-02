import React from 'react'
import Dropdown from '../../navigation/Dropdown/Dropdown'
import DropdownHeader from '../../navigation/DropdownHeader/DropdownHeader'
import DropdownItem from '../../navigation/DropdownItem/DropdownItem'
import Icon from '../../content/Icon/Icon'

const UserNav = () => {
  const avatar = 'http://via.placeholder.com/35x35?text=U'
  const fullName = 'Maria Benatti'

  return (
    <Dropdown label={fullName} icon={Icon.Sound} width={190}>
      <DropdownHeader>
        <img src={avatar} alt={fullName} />
        <span>{fullName}</span>
      </DropdownHeader>
      <DropdownItem><Icon name='user' /> Perfil</DropdownItem>
      <DropdownItem><Icon name='times' /> Sair</DropdownItem>
    </Dropdown>
  )
}

export default UserNav
