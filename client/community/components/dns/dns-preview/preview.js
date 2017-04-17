import React, { Component, PropTypes } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

class Preview extends Component {

  render () {
    const { children, menuComponent: MenuComponent, isActive } = this.props

    return (
      <div className={`domain--preview flex flex-wrap ${isActive ? 'active' : ''}`}>
        <span className='circle'>
          <i className='fa fa-check' />
        </span>
        <div className='data--preview'>
          {children}
        </div>
        {MenuComponent && (
          <div className='menu--preview'>
            {MenuComponent}
          </div>
        )}
      </div>
    )
  }
}

Preview.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  menuComponent: PropTypes.element
}

export default Preview
