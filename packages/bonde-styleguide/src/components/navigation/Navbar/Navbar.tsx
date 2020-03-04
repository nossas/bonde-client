import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Navbar = styled(({ children, className, renderBrand }) => (
  <div className={className}>
    {renderBrand && renderBrand()}

    <div>
      {children}
    </div>
  </div>
))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

Navbar.propTypes = {
  /** The home page icon. */
  renderBrand: PropTypes.func
}

Navbar.displayName = 'Navbar'

/** @component */
export default Navbar
