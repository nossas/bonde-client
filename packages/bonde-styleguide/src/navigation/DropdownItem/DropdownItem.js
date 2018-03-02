import styled from 'styled-components'

/**
 * The item component that composes the `Dropdown`.
 */
const DropdownItem = styled.a`{
  width: auto;
  display: block;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  text-decoration: none;
  padding: 10px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;

  & > svg, & > i {
    margin-right: 15px;
  }
}`

/* @component */
export default DropdownItem
