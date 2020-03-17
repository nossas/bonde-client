import React from 'react'
import styled from 'styled-components'
import Icon from '../../content/Icon/Icon'


const DropdownIconItem = styled(({ className, value, onClick }) => {
  const { icon, label } = value

  return (
    <div className={className} onClick={onClick}>
      <Icon name={icon} size={16} />
      {label}
    </div>
  )
})`
  display: flex;
  padding: 10px 25px;
  flex-grow: 1;
  align-items: center;

  svg {
    margin: 0 10px;
  }

  &:hover {
    color: #ee0099;

    svg, path {
      color: #ee0099;
      fill: #ee0099;
      stroke: #ee0099;
    }
  }
`
export default DropdownIconItem