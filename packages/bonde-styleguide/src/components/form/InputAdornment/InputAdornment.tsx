import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../../content/Icon/Icon'

//
// TODO: Make component accepts the content like icons as a children.
//
const InputAdornment = styled(({ className, invalid, valid }) => (
  <div className={className}>
    {invalid && <Icon name='exclamation' size={8} color='#FF2B4E' />}
    {valid && <Icon name='tick' size={8} color='#50E3C2' />}
  </div>
))`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: relative;

  ${props => props.invalid && `{
    border-bottom-color: #FF2B4E;
  }`}

  ${props => props.valid && `{
    border-bottom-color: #50E3C2;
  }`}
`

InputAdornment.propTypes = {
  /** Show an invalid input adornment. */
  invalid: PropTypes.bool,
  /** Show a valid input adornment. */
  valid: PropTypes.bool
}

InputAdornment.displayName = 'InputAdornment'

/** @component */
export default InputAdornment
