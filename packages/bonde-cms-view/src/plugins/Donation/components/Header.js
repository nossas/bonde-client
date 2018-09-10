import styled from 'styled-components'

const Header = styled.h2`
  padding: 1rem;
  color: #fff;
  border-radius: 3px 3px 0 0;
  font-weight: normal;
  text-align: center;
  ${props => props.bgColor && `background-color: ${props.bgColor};`}
  margin: 0;
`

export default Header
