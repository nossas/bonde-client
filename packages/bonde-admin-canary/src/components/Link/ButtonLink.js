import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const ButtonLink = ({ to, title, children, align }) => (
  <Link to={to} title={title}>
    <Button flat align={align || 'left'} padding='0'>
      {children}
    </Button>
  </Link>
)

ButtonLink.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.string
}

export default ButtonLink
