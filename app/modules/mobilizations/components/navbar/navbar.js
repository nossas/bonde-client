import React, { PropTypes } from 'react'
import Menu from './menu'


const Navbar = props => {

  const { blocks, editable, ...menuProps } = props

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )

  const menu = (
    <Menu
      {...menuProps}
      editable={editable}
      blocks={onlyVisibleBlocks}
    />
  )

  return (
    <div className="absolute col-12 z3">
      <div className="lg-show center">{menu}</div>
      {/* mobile version */}
      <div className="lg-hide">{menu}</div>
    </div>
  )
}

Navbar.propTypes = {
  editable: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array,
  blockUpdate: PropTypes.func
}

Navbar.defaultProps = {
  editable: false,
  blocks: []
}

export default Navbar
