import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const NavItemStyled = styled.a`
  display: inline-block;
  padding: 1rem;
  color: white;

  @media screen and (max-width: 1023px) {
    display: block;
  }
`

const NavItem = ({ section, href }) => (
  <NavItemStyled href={href}>
    {section.name}
  </NavItemStyled>
)

NavItem.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default NavItem
