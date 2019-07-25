import * as React from 'react'
import { BaseWidget } from 'storm-react-diagrams'


class BetaPortWidget extends BaseWidget {
  constructor(props: PortProps) {
    super("srd-port", props);
    this.state = {
      selected: false
    };
  }

  getClassName() {
    return "port " + super.getClassName() + (this.state.selected ? this.bem("--selected") : "");
  }

  render() {
    return (
      <div
        {...this.getProps()}
        onDoubleClick={this.props.onDoubleClick}
        onMouseEnter={() => {
          this.setState({ selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
        }}
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      >
        {this.props.children}
      </div>
    );
  }
}

export default BetaPortWidget