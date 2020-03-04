import React from 'react'
import PropTypes from 'prop-types'
import Text from '../../content/Text/Text'

const InputHint = ({ children, invalid }) => (
  <Text
    color={invalid ? '#FF2B4E' : '#AAAAAA'}
    fontSize={11}
    fontWeight={600}
    lineHeight={1.36}
    letterSpacing='0.4px'
    uppercase
  >
    {children}
  </Text>
)

InputHint.propTypes = {
  /** The message that will be rendered. */
  children: PropTypes.string.isRequired,
  /** Show hint text as an error. */
  invalid: PropTypes.bool
}

InputHint.displayName = 'InputHint'

/** @component */
export default InputHint
