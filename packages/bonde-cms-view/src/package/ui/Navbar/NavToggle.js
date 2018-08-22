import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavButton from './NavButton'

export const NavItemGroup = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  margin-top 0.2rem;
`

const Toggle = styled.div`
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  margin: 0.5rem;
  
  @media screen and (max-width: 1023px) {
    display: block;
  }
`

// renders only mobile version
class NavToggle extends React.Component {
  state = {
    show: false
  }
  
  render () { 
    const { children } = this.props
    const { show } = this.state
    
    return (
      <Toggle>
        <NavButton onClick={() => this.setState({ show: !show })}>
          <FontAwesomeIcon icon='bars' />
        </NavButton>
        {show && (
          <NavItemGroup>
            {children}
          </NavItemGroup>
        )}
      </Toggle>
    )
  }
}

export default NavToggle
