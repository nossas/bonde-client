import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class DropDownMenuItem extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array
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
        <i className={classnames('fa', 'fa-' + this.props.icon)} />
      )
    }
  }

  renderOverlay() {
    if (this.state.open) {
      return (
        <div
          className="fixed top-0 right-0 bottom-0 left-0"
          onClick={::this.handleOverlayClick}
          style={{zIndex: 9998}} />
      )
    }
  }

  renderChildren() {
    if (this.props.children.length > 0) {
      return this.props.children.map((child, index) => {
        return React.cloneElement(child, {key: 'item-' + index, onItemClick: ::this.handleOverlayClick})
      })
    }
    return React.cloneElement(this.props.children, {onItemClick: ::this.handleOverlayClick})
  }

  render() {
    return (
      <div className={classnames('absolute top-0 right-0', this.props.className)} style={{zIndex: 9998}}>
        <button className={classnames('button', this.props.menuClassName)} onClick={::this.handleClick}>
          {this.renderIcon()} {this.props.text}
        </button>
        <div className={classnames('absolute right-0 mt1 mr1 nowrap', this.props.menuClassName, (this.state.open ? '' : 'display-none'))} style={{zIndex: 9999}}>
          { this.renderChildren() }
        </div>
        { this.renderOverlay() }
      </div>
    )
  }
}
