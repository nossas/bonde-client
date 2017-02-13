import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Background = ({ children, contentSize, image }) => {
  const bgStyle = {
    backgroundImage: image ? `url('${image}')` : undefined,
    overflow: 'auto'
  }

  return (
    <div className='bg-center bg-cover absolute top-0 right-0 bottom-0 left-0' style={bgStyle}>
      <div className={classnames(`col-${contentSize}`, 'table mx-auto full-height')}>
        <div className='table-cell align-middle'>
          {children}
        </div>
      </div>
    </div>
  )
}

Background.propTypes = {
  contentSize: PropTypes.number,
  image: PropTypes.string
}

Background.defaultProps = {
  contentSize: 3
}

export default Background
