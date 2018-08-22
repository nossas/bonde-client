import styled from 'styled-components'

// NavButton render on mobile version
const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: white;
  padding: 8px 16px;
  border: none; 
`

NavButton.displayName = 'NavButton'

export default NavButton
