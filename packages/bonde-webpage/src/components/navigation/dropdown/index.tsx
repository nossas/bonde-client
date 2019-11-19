import * as PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { BarsIcon } from '../../icons'

class DropdownMenu extends React.Component<{
  wrapperClassName: any,
  buttonClassName: any,
  menuClassName: any,
  menuStyle: any,
  icon: any,
  text?: any,
  children: any
}, { open: any }> {

  propTypes = {
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    menuStyle: PropTypes.object,
    wrapperClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array,
    icon: PropTypes.string
  }

  constructor (props: any, context: any) {
    super(props, context)
    this.state = { open: false }
  }

  handleClick () {
    this.setState({ open: !this.state.open })
  }

  handleOverlayClick () {
    this.setState({ open: false })
  }

  renderIcon () {
    return !this.props.icon ? null : (
      <BarsIcon />
    )
  }

  renderOverlay () {
    return !this.state.open ? null : (
      <div
        className='overlay fixed top-0 right-0 bottom-0 left-0 z1'
        onClick={this.handleOverlayClick.bind(this)}
      />
    )
  }

  renderChildren () {
    return this.props.children.map((child: any, index: any) => {
      const props = child.type !== 'div' ? { onItemClick: this.handleOverlayClick.bind(this) } : {}
      return React.cloneElement(child, {
        key: 'item-' + index,
        ...props
      })
    })
  }

  render () {
    const {
      wrapperClassName,
      buttonClassName,
      menuClassName,
      menuStyle,
      text,
      children
    } = this.props

    return (
      <div style={{ marginTop: '5px' }} className={classnames('relative', wrapperClassName)}>
        <button type='button' className={buttonClassName} onClick={this.handleClick.bind(this)}>
          {this.renderIcon()} {text}
        </button>
        <div
          className={classnames(
            'absolute nowrap z2',
            menuClassName,
            (this.state.open ? '' : 'display-none')
          )}
          style={menuStyle}
        >
          {children.length > 0 && this.renderChildren()}
        </div>
        {this.renderOverlay()}
      </div>
    )
  }
}

export default DropdownMenu
