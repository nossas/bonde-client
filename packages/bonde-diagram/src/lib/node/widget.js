import React from 'react'
import _ from 'lodash'
import {
  BaseWidget,
  DefaultPortLabel
} from 'storm-react-diagrams'


class BaseNodeWidget extends BaseWidget {
  constructor(props) {
    super('srd-base-node', props)
    this.state = {
      value: props.node.name,
      isEditing: false
    }
  }

  generatePort(port) {
    return <DefaultPortLabel model={port} key={port.id} />
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
    }
  }

  handleDoubleClick(e) {
    this.setState({ isEditing: true })
  }

  render() {
    const { node } = this.props
    const { value, isEditing } = this.state

    return (
      <div {...this.getProps()} onDoubleClick={this.handleDoubleClick.bind(this)}>
        {isEditing ? (
          <textarea
            className={this.bem("__title")}
            defaultValue={value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyUp={this.handleKeyPress.bind(this)}
          />
        ) : (
          <div className={this.bem("__title")}>{node.name}</div>
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