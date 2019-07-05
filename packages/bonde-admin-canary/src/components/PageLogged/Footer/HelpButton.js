import React from 'react'
import { Button } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const HelpButton = ({ children }) => (
  <Button
    dark
    onClick={() => {
      window.open('http://www.trilho.bonde.org/', '_blank')
    }}
  >
    {children}
  </Button>
)

HelpButton.propTypes = {
  children: PropTypes.node
}

export default HelpButton
