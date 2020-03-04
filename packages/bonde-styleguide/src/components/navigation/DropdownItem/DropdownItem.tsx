import React from 'react'
import styled from 'styled-components'

const Item = styled('a')`
  width: auto;
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
`


/**
 * The item component that composes the `Dropdown`.
 */
const DropdownItem = ({
  component: Component,
  closeMenu,
  onClick,
  ...props
}) => {
  const Styled = Component ? Item.withComponent(Component) : Item

  return (
    <Styled
      {...props}
      onClick={() => {
        if (closeMenu) closeMenu()
        onClick()
      }}
    />
  )
}

DropdownItem.displayName = 'DropdownItem'

/** @component */
export default DropdownItem
