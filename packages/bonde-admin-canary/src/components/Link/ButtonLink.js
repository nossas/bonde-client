import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bonde-styleguide'

export default ({ to, title, children, align }) => (
  <Link to={to} title={title}>
    <Button flat align={align || 'left'} padding='0'>
      {children}
    </Button>
  </Link>
)
