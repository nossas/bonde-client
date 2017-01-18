import React, { PropTypes } from 'react'
import Menu from './menu'


const Navbar = props => {

  const { mobilization, blocks, editable } = props

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )
  const menuProps = { mobilization, blocks: onlyVisibleBlocks, editable }

  return (
    <div className="absolute col-12 z3">
      <div className="lg-show center">
        <Menu {...menuProps} />
      </div>
      {/* mobile version */}
      <div className="lg-hide">
        <Menu {...menuProps} />
      </div>
    </div>
  )
}

Navbar.propTypes = {
  editable: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array
}

Navbar.defaultProps = {
  editable: false,
  blocks: []
}

export default Navbar
