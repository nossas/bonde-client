import _ from 'lodash'
import { DefaultLinkModel, PortModel } from 'storm-react-diagrams'


class BetaPortModel extends PortModel {
  constructor(isInput, name, label, id) {
    super(name, 'beta', id)
    this.in = isInput
    this.label = label || name
  }

  deSerialize(object, engine) {
    super.deSerialize(object, engine)
    this.in = object.in
    this.label = object.label
  }

  serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      label: this.label
    })
  }

  link(port) {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  canLinkToPort(port) {
    if (port instanceof BetaPortModel) {
      return this.in !== port.in
    }
    return true
  }

  createLinkModel() {
    let link = super.createLinkModel()
    return link || new DefaultLinkModel()
  }

  setLabel(label) {
    this.label = label
  }
}


export default BetaPortModel