import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text/Text'


const TextNumber = Text.extend`
  font-size: 32px !important;
  font-weight: 900 !important;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const Number = ({ value, icon: Icon }) => (
  <TextNumber>
    <span>{value}</span>
    {Icon && Icon}
  </TextNumber>
)

const { oneOfType, number, node, func } = PropTypes

Number.propTypes = {
  /** The value that will be displayed. */
  value: number,
  /** The icon that will be displayed besides the value. */
  icon: oneOfType([node, func])
}

export default Number
