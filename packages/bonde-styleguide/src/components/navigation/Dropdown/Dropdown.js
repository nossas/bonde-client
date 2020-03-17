import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DropdownList from './ui/DropdownList'
import DropdownItem from './ui/DropdownItem'
import DropdownInput from './ui/DropdownInput'


const useOutsideAlerter = (ref, onEvent) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onEvent()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

const DropdownFluid = styled.span`
  display: flex;
  flex-direction: column;
`

const DropdownFluidList = styled.div`
  position: absolute;
  top: calc(100% + 15px);
  display: flex;
  flex-direction: column;
  z-index: 3;
`

const DropdownFluidInput = styled.div`
  display: flex;
  z-index: 2;
  cursor: pointer;
`

const DropdownFluidItem = styled.div`
  display: flex;
  ${props => props.clickable && `cursor: pointer;`}
`

const DropdownFluidLayout = styled.div`
  position: relative;
`

const Dropdown = ({
  placeholder,
  item,
  list,
  selectable,
  onSelect,
  dropdownInput: DropdownInputUI,
  dropdownItem: DropdownItemUI,
  dropdownList: DropdownListUI
}) => {
  const [open, setOpen] = useState(false)
  // click ousite dropdown is close
  const dropdownRef = useRef(null)
  useOutsideAlerter(dropdownRef, () => setOpen(false))

  return (
    <DropdownFluid ref={dropdownRef}>
      <DropdownFluidInput onClick={() => setOpen(!open)}>
        <DropdownInputUI
          selectable={selectable}
          placeholder={placeholder}
          selected={item}
          open={open}
        />
      </DropdownFluidInput>
      <DropdownFluidLayout>
      {open && (
        <DropdownFluidList>
          <DropdownListUI>
          {list.map((value, index) => {
            const clickable = typeof value === 'string'
              ? true : typeof value.clickable === 'undefined'
              ? true : value.clickable
            
            const itemProps = {
              clickable,
              onClick: !clickable ? null : () => {
                onSelect(value)
                setOpen(false)
              }
            }

            return (
              <DropdownFluidItem key={`dropdown-item-${index}`} {...itemProps}>
                {typeof value !== 'string' && value.render
                  ? <value.render value={value} selected={item} />
                  : <DropdownItemUI clickable value={value} selected={item} />
                }
              </DropdownFluidItem>
            )
          })}
          </DropdownListUI>
        </DropdownFluidList>
      )}
      </DropdownFluidLayout>
    </DropdownFluid>
  )
}

const { bool, string, any, array, func } = PropTypes

Dropdown.propTypes = {
  title: string,
  item: any,
  items: array.isRequired,
  selectable: bool.isRequired,
  onSelect: func,
  dropdownInput: any,
  dropdownItem: any,
  dropdownList: any
}

Dropdown.defaultProps = {
  selectable: true,
  items: [],
  dropdownInput: DropdownInput,
  dropdownItem: DropdownItem,
  dropdownList: DropdownList
}

/** @component */
export default Dropdown