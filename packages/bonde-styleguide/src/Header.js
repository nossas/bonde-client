import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Icon from './Icon'
import Title from './Title'
import Dropdown, {
  Item as DropdownItem,
  Header as DropdownHeader
} from '../src/Dropdown'

const Navbar = styled.div`{
  position: fixed;
  width: inherit;
  min-height: 80px;
  background: #000;
  padding: 0 155px; 
}`

const Nav = styled.nav`{
  display: flex;
  align-items: center;
  margin: 28px 0 22px;
  align-items: center;
  justify-content: space-between;
}`

const UserDropdown = ({ user }) => {
  
  const fullName = user.last_name
    ?`${user.first_name} ${user.last_name}`
    : user.first_name

  return (
    <Dropdown label={fullName} icon={Icon.Sound} width={190}>
      <DropdownHeader>
        <img src={user.avatar} alt={fullName} />
        <span>{fullName}</span>
      </DropdownHeader>
      <DropdownItem>
        <Icon.User /> Perfil
      </DropdownItem>
      <DropdownItem>
        <Icon.Times /> Sair
      </DropdownItem>
    </Dropdown>
  )
}

const Header = ({ children, pageTitle, user }) => (
  <Navbar>
    <Nav>
      <a href='#' title='Bonde.org'>
        <Icon.Bonde />
      </a>
      {user && <UserDropdown user={user} />}
    </Nav>
    <div>
      {pageTitle && <Title.H3 color='#fff'>{pageTitle}</Title.H3>}
      {children}
    </div>
  </Navbar>
)

export default Header
