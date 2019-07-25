import React from "react"
import { BaseWidget } from 'storm-react-diagrams'
import DefaultPortWidget from './DefaultPortWidget'


class DefaultLabelWidget extends BaseWidget {
  constructor(props) {
    super("srd-default-port", props)
  }

  getClassName() {
    return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"))
  }

  render() {
    
    return (
      <div {...this.getProps()}>
        <DefaultPortWidget
          node={model.getParent()}
          name={model.name}
        />
      </div>
    )
  }
}

export default DefaultLabelWidget