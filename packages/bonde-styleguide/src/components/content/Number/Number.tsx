import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../Text/Text'
import IconColorful from '../IconColorful/IconColorful'

const TextNumber = styled(Text)`
  font-size: 32px !important;
  font-weight: 900 !important;
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`

const Number = ({ value, iconName }) => {
  return (
    <TextNumber>
      <span>{value}</span>
      {iconName && <IconColorful name={iconName} />}
    </TextNumber>
  )
}

Number.propTypes = {
  /** The value that will be displayed. */
  value: PropTypes.number,
  /** The icon that will be displayed besides the value. */
  iconName: PropTypes.string
}

Number.displayName = 'Number'

/** @component */
export default Number
