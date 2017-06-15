import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) require('./index.scss')

const Background = ({ children, contentSize, image, alignment }) => {
  const flexAlignments = {
    center: 'center',
    'top': 'flex-start',
    'bottom': 'flex-end',
  }
  const justifyContent = flexAlignments[alignment.x]
  const alignItems = flexAlignments[alignment.y]

  const bgStyle = {
    backgroundImage: image ? `url('${image}')` : undefined,
    overflow: 'auto',
    alignItems,
    justifyContent
  }

  return (
    <div
      className='bg-reboo bg-center bg-cover absolute top-0 right-0 bottom-0 left-0'
      style={bgStyle}
    >
      <div className={classnames(`content col-${contentSize}`)}>
        <div className='col-12'>
          {children}
        </div>
      </div>
    </div>
  )
}

Background.propTypes = {
  contentSize: PropTypes.number,
  image: PropTypes.string,
  alignment: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string
  }).isRequired
}

Background.defaultProps = {
  contentSize: 3,
  alignment: { x: 'center', y: 'center' }
}

export default Background
