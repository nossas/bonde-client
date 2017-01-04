import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class DropDownMenu extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    menuStyle: PropTypes.object,
    wrapperClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array,
    icon: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)
    this.state = { open: false }
  }

  handleClick() {
    this.setState({open: !this.state.open})
  }

  handleOverlayClick() {
    this.setState({open: false})
  }

  renderIcon() {
    if (this.props.icon) {
      return (
        <i ref='icon' className={classnames('fa', 'fa-' + this.props.icon)} />
      )
    }
  }

  renderOverlay() {
    if (this.state.open) {
      return (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z1"
          onClick={::this.handleOverlayClick}/>
      )
    }
  }

  renderChildren() {
    return this.props.children.map((child, index) => {
      return React.cloneElement(child, {
        key: 'item-' + index,
        onItemClick: ::this.handleOverlayClick
      })
    })
  }

  render() {
    const {
      wrapperClassName,
      buttonClassName,
      menuClassName,
      menuStyle,
      text,
      children
    } = this.props

    return (
      <div style={{marginTop: '5px'}} className={classnames('relative', wrapperClassName)}>
        <button ref='button' className={buttonClassName} onClick={::this.handleClick}>
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
          { children.length > 0 && this.renderChildren() }
        </div>
        { this.renderOverlay() }
      </div>
    )
  }
}
