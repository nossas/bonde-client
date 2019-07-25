import React from "react"
import { BaseWidget } from 'storm-react-diagrams'
import BetaPortWidget from './BetaPortWidget'


class BetaPortLabelWidget extends BaseWidget {
  constructor(props) {
    super("srd-base-port", props)
    this.state = { value: props.model.label, isEditing: false }
  }

  getClassName() {
    return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"))
  }

  handleDoubleClick() {
    this.setState({ isEditing: true })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.props.model.setLabel(e.target.value)

      this.setState({ isEditing: false })
      this.forceUpdate()
      e.stopPropagation()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // stop propagation on backspace and delete pressed
      e.stopPropagation()
    } else if (e.key === 'Escape') {
      this.setState({ isEditing: false, value: this.props.model.label })
    }
  }

  render() {
    const { isEditing, value } = this.state
    const { model } = this.props
    
    return (
      <div {...this.getProps()}>
        {!model.in ? (
          <BetaPortWidget
            node={model.getParent()}
            name={model.name}
            onDoubleClick={this.handleDoubleClick.bind(this)}
          >
            {isEditing ? (
              <input
                className="name"
                onChange={e => this.setState({ value: e.target.value })}
                value={value}
                onKeyUp={this.handleKeyPress.bind(this)}
              />
            ) : (
              <div className="name" onDoubleClick={this.handleDoubleClick.bind(this)}>{value}</div>
            )}
          </BetaPortWidget>
        ) : (
          <BetaPortWidget node={model.getParent()} name={model.name} />
        )}
      </div>
    )
  }
}

export default BetaPortLabelWidget