import React from 'react'
import PropTypes from 'prop-types'
import Col from './Col'

const Widget = ({ widget, children }) => (
  <Col
    lg={widget.lgSize}
    md={widget.mdSize}
    sm={widget.smSize}
  >
    {children}
  </Col>
)

const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

Widget.propTypes = {
  widget: PropTypes.shape({
    kind: PropTypes.string.isRequired,
    lgSize: PropTypes.oneOf(sizes),
    mdSize: PropTypes.oneOf(sizes),
    smSize: PropTypes.oneOf(sizes)
  })
}

export default Widget
