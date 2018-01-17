import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import $ from 'jquery'

const NavbarButton = props => {
  const handleClick = e => {
    e.preventDefault()
    const { targetId, scrollableId } = props
    const target = $(`#${targetId}`)
    const scrollable = $(`#${scrollableId}`)
    const yPosition = target.position().top + scrollable.scrollTop() - scrollable.position().top

    scrollable.stop().animate({scrollTop: yPosition}, 500, () => {
      window.location.hash = targetId
    })
  }

  const {className, children, hidden} = props
  return (
    <a
      className={classnames(className, 'navbar-button relative')}
      onClick={handleClick}>
      <span style={{ opacity: hidden ? '.25' : '1' }}>
        {children}
      </span>
      {hidden && (
        <div className='h2 absolute top-0 bottom-0 left-0 right-0 center flex flex-center'>
          <i className='fa fa-eye-slash flex-auto' />
        </div>
      )}
    </a>
  )
}

NavbarButton.propTypes = {
  targetId: PropTypes.string.isRequired,
  scrollableId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string,
  hidden: PropTypes.bool
}

export default NavbarButton
