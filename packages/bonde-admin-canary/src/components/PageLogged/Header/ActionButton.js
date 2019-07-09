import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Spacing } from 'bonde-styleguide'

const ActionButton = ({ label, to, ...props }) => (
  <Spacing margin={{ left: 17 }}>
    <Link to={to}>
      <Button label={label} {...props}>
        {label}
      </Button>
    </Link>
  </Spacing>
)

ActionButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default ActionButton
