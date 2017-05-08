import PropTypes from 'prop-types'
import React from 'react'

const PressureCount = ({ value, color, text }) => {
  /* TODO: support all browser
   * -webkit-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * -moz-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   */
  const pressureCount = {
    boxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)'
  }
  return (
    <div className='pressure-count p3 bg-white rounded-bottom' style={pressureCount}>
      <p className='center m0'>
        <span className='h1' style={{color: color}}>{value}</span>
        <span className='black bold h3 ml1'>{text}</span>
      </p>
    </div>
  )
}

PressureCount.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string
}

PressureCount.defaultProps = {
  value: 0,
  text: 'pressões feitas'
}

export default PressureCount
