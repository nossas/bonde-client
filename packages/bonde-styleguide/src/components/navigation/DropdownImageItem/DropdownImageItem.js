import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DropdownImageItem = styled(({ className, value }) => {
  const { img, label } = value
  return (
    <div className={className}>
      <img src={img.src} alt={img.alt} />
      {label}
    </div>
  )
})`
  display: flex;
  padding: 10px 25px;
  flex-grow: 1;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  ${props => props.clickable && `
    &:hover {
      background-color: #c7c7c7;
    }
  `}
`

const { any, shape, string } = PropTypes

DropdownImageItem.propTypes = {
  value: shape({
    img: shape({ src: string.isRequired, alt: string }),
    label: any.isRequired
  }),
  placeholder: string
}

/** @component */
export default DropdownImageItem