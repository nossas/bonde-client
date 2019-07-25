import React from 'react'
import _ from 'lodash'
import { BaseWidget } from 'storm-react-diagrams'
import BetaPortWidget from './BetaPortLabelWidget'


class BaseNodeWidget extends BaseWidget {
  constructor(props) {
    super('srd-base-node', props)
    this.state = {
      value: props.node.name,
      isEditing: false
    }
  }

  generatePort(port) {
    return (
      <BetaPortWidget
        node={port.getParent()}
        model={port}
        key={port.id}
      />
    )
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.props.node.setName(e.target.value)

      this.setState({ isEditing: false })
      this.forceUpdate()
      e.stopPropagation()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // stop propagation on backspace and delete pressed
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      this.setState({ isEditing: false, value: this.props.node.name })
    }
  }

  handleDoubleClick(e) {
    this.setState({ isEditing: true })
  }

  render() {
    const { node } = this.props
    const { value, isEditing } = this.state

    return (
      <div {...this.getProps()}>
        {isEditing ? (
          <textarea
            className={this.bem("__title")}
            defaultValue={value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyUp={this.handleKeyPress.bind(this)}
          />
        ) : (
          <div className={this.bem("__title")} onDoubleClick={this.handleDoubleClick.bind(this)}>{node.name}</div>
        )}
        <div className={this.bem("__ports")}>
          <div className={this.bem("__in")}>
            {_.map(node.getInPorts(), this.generatePort.bind(this))}
          </div>
          <div className={this.bem("__out")}>
            {_.map(node.getOutPorts(), this.generatePort.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

export default BaseNodeWidget