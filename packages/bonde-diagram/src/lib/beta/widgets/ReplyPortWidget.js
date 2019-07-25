import React from 'react'
import { BaseWidget } from 'storm-react-diagrams'


class ReplyPortWidget extends BaseWidget {
  constructor(props) {
    super('srd-port', props)
    this.state = { selected: false }
  }

  getClassName() {
    return 'port ' + super.getClassName() + (this.state.selected ? this.bem('--selected') : '');
  }

  render() {
    return (
      <div
        {...this.getProps()}
        onMouseEnter={() => {
          this.setState({ selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
        }}
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      />
    )
  }
}

export default ReplyPortWidget