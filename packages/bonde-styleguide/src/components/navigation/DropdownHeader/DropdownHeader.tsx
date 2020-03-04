import styled from 'styled-components'

/**
 * The header component of `Dropdown`.
 */
const DropdownHeader = styled.div`
  width: auto;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: flex-start;

  & > img {
    margin-right: 15px;
  }
`

DropdownHeader.displayName = 'DropdownHeader'

/** @component */
export default DropdownHeader
