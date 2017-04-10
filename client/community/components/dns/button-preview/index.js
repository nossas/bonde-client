import React, { PropTypes } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

const ButtonPreview = ({ text }) => (
  <div className='button-preview flex flex-wrap'>
    <div className='circle bg-pagenta'>
      <i className='fa fa-plus' />
    </div>
    <p>{text}</p>
  </div>
)

ButtonPreview.propTypes = {
  text: PropTypes.string.isRequired
}

export default ButtonPreview
