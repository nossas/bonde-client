import React from 'react'
import Nav from './Nav'
import NavItem from './NavItem'
import NavToggle from './NavToggle'

const Navbar = ({ children }) => (
  <React.Fragment>
    <Nav children={children} />
    {/* renders only mobile version */}
    <NavToggle children={children} />
  </React.Fragment>
)

Navbar.Item = NavItem

export default Navbar
