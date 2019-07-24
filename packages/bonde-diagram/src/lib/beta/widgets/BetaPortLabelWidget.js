import React from "react"
import { BaseWidget } from 'storm-react-diagrams'
import BetaPortWidget from './BetaPortWidget'


class BetaPortLabelWidget extends BaseWidget {
  constructor(props) {
    super("srd-base-port", props);
  }

  getClassName() {
    return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"));
  }

  render() {
    const { model } = this.props
    
    return (
      <div {...this.getProps()}>
        {!model.in ? (
          <BetaPortWidget node={model.getParent()} name={model.name}>
            <div className="name">{this.props.model.label}</div>
          </BetaPortWidget>
        ) : (
          <BetaPortWidget node={model.getParent()} name={model.name} />
        )}
      </div>
    );
  }
}

export default BetaPortLabelWidget