import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//
// Shared variables
//
const sizes = {
  xsmall: '5px',
  small: '10px',
  normal: '15px',
  large: '20px',
  xlarge: '25px'
}

const BarTrack = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: ${({ trackColor }) => trackColor};
  ${({ size }) => `
    height: ${sizes[size] || sizes['normal']};
    border-radius: ${sizes[size] || sizes['normal']};
  `}
`

const BarThumb = styled(() => <BarTrack />)`
  width: ${({ value }) => `${value || 0}%`};
  margin: 0;
  background-color: ${({ thumbColor }) => thumbColor};
  font-family: Nunito Sans;
  font-size: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BarText = styled.span`
  font-size: 10px;
  color: ${({ textColor }) => textColor};
  ${({ size, value }) => (['xsmall', 'small'].includes(size) || Number(value) <= 5) && `
    display: none;
  `}
`

/**
 * Rounded border progress bar component.
 */
const ProgressBar = ({ value, trackColor, thumbColor, textColor, size }) => (
  <BarTrack size={size} trackColor={trackColor}>
    <BarThumb size={size} thumbColor={thumbColor} value={value}>
      <BarText size={size} value={value} textColor={textColor}>
        {value}%
      </BarText>
    </BarThumb>
  </BarTrack>
)

const { oneOf, string, number } = PropTypes

ProgressBar.propTypes = {
  /** The percentage of the progress. */
  value: number,
  /** The size of the bar. */
  size: oneOf(Object.keys(sizes)),
  /** The track background color. */
  trackColor: string,
  /** The progress fill background color. */
  thumbColor: string,
  /** The progress fill value text color. */
  textColor: string
}

ProgressBar.defaultProps = {
  value: 0,
  trackColor: '#eeeeee',
  thumbColor: '#50e3c2',
  size: 'normal',
  textColor: '#000000'
}

ProgressBar.sizes = sizes

ProgressBar.displayName = 'ProgressBar'

/** @component */
export default ProgressBar
