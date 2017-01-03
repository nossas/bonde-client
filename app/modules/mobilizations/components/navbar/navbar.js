import React, { PropTypes } from 'react'
import Menu from './menu'

const Navbar = props => {
  const { blocks, editable } = props

  const onlyVisibleBlocks = blocks.filter(
    block => editable ? !block.hidden : !block.hidden && !block.menu_hidden
  )

  return (
    <div className='absolute col-12 z3'>
      <div className='lg-show center'>
        <Menu blocks={onlyVisibleBlocks} />
      </div>
      {/* mobile version */}
      <div className='lg-hide'>
        <Menu blocks={onlyVisibleBlocks} />
      </div>
    </div>
  )
}

Navbar.propTypes = {
  editable: PropTypes.bool.isRequired,
  blocks: PropTypes.array
}

Navbar.defaultProps = {
  editable: false,
  blocks: []
}

export default Navbar
