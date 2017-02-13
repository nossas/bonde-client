import React, { PropTypes } from 'react'
import { MenuDesktop, MenuMobile } from './'

const Navbar = props => {
  const { blocks, editable, ...menuProps } = props

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )

  return (
    <div className='absolute col-12 z3'>
      <MenuDesktop
        {...menuProps}
        blocks={onlyVisibleBlocks}
        editable={editable}
      />
      <MenuMobile
        {...menuProps}
        blocks={onlyVisibleBlocks}
        editable={editable}
      />
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
