import React from 'react'
import PropTypes from 'prop-types'
import Background from './Background'
import Row from './Row'

const Section = ({ children, section }) => (
  <Background bgImage={section.bgImage}>
    <Row>
      {children}
    </Row>
  </Background>
)

Section.propTypes = {
  section: PropTypes.shape({
    bgImage: PropTypes.string
  })
}

export default Section
