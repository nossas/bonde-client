import React, { PropTypes } from 'react'


const FloatLayout = (props) => {

  return (
    <div className={props.position}>
      {props.children}
    </div>
  )
}

FloatLayout.propTypes = {
  position: PropTypes.oneOf(['floatTopRight', 'floatTopLeft']),
}

export default FloatLayout
