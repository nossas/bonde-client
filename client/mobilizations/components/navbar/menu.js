import React, { PropTypes } from 'react'
import classnames from 'classnames'

// Global module dependencies
import { DropdownMenu } from '~components/dropdown-menu'
import { NavbarEditionWrapper } from '~components/navigation/navbar'

const Menu = props => {
  const { mobile, blocks } = props
  const children = blocks.map(block => (
    <div key={block.id} className={classnames({ 'inline-block': !mobile })}>
      <NavbarEditionWrapper
        key={`navbar-edition-wrapper-${block.id}`}
        block={block}
        className='btn btn-transparent block white p2'
      />
    </div>
  ))

  return !mobile ? (
    <div className='bg-darken-4'>
      {children}
    </div>
  ) : (
    <DropdownMenu
      wrapperClassName='absolute right-0 top-0 m1'
      buttonClassName='btn bg-darken-4 white rounded'
      menuClassName='rounded bg-darken-4 white top-0 right-0'
      menuStyle={{ marginTop: '40px' }}
      icon='bars'
    >
      {children}
    </DropdownMenu>
  )
}

Menu.propTypes = {
  mobile: PropTypes.bool.isRequired,
  blocks: PropTypes.array.isRequired
}

Menu.defaultProps = {
  blocks: [],
  mobile: false
}

export default Menu
