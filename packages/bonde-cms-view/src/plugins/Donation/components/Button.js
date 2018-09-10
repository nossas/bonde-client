import styled from 'styled-components'

const Button = styled.button`
  color: #fff;
  text-transform: uppercase;
  padding: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  height: auto;
  vertical-align: middle;
  ${props => props.bgColor && `background-color: ${props.bgColor};`}
  border: none;
  width: 100%;
`

export default Button
