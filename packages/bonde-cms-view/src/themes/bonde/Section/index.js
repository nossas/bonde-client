import React from 'react'
import PropTypes from 'prop-types'
import Background from './Background'
import Row from './Row'


const Section = ({ children, section }) => {
  let bgColor
  try {
    const rgba = JSON.parse(section.bgClass)
    bgColor = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  } catch (e) {
    // silent error because className
    // TODO: check behavior of className themes bonde-admin
  }

  return (
    <Background
      bgImage={section.bgImage}
      bgColor={!section.bgImage ? bgColor : undefined}
    >
      <Row>
        {children}
      </Row>
    </Background>
  )
}

Section.propTypes = {
  section: PropTypes.shape({
    bgImage: PropTypes.string
  })
}

export default Section
