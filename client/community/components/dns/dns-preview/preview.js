import React, { Component, PropTypes } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

class Preview extends Component {

  render () {
    const { children, isActive, onClick, onDelete } = this.props

    return (
      <div className={`domain--preview flex flex-wrap ${isActive ? 'active' : ''}`}>
        <span className='circle'>
          <i className='fa fa-check' />
        </span>
        <div className='data--preview'>
          {children}
        </div>
        <div className='menu--preview'>
          <div className='dropdown--menu'>
            <i className='fa fa-ellipsis-h' />
            <div className='dropdown--content'>
              {onClick && (
                <div className='dropdown--item' onClick={onClick}>
                  <i className='fa fa-bars' />
                  <span>Detalhar</span>
                </div>
              )}
              {onDelete && (
                <div className='dropdown--item' onClick={onDelete}>
                  <i className='fa fa-trash' />
                  <span>Remover</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Preview.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  isActive: PropTypes.bool
}

export default Preview
