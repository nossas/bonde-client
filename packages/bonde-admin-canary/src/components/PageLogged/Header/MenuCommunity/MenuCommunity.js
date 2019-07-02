import React from 'react'
import Proptypes from 'prop-types'

const MenuCommunity = ({ children }) => (
  <div>
    { children }
  </div>
)

MenuCommunity.propTypes = {
  router: Proptypes.object
}

export default MenuCommunity
