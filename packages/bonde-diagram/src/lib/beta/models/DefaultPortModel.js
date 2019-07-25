import _ from 'lodash'
import { DefaultLinkModel, PortModel } from 'storm-react-diagrams'


class DefaultPortModel extends PortModel {
  constructor(isInput, name, id) {
    super(name, 'default', id)
    this.in = isInput
    this.name = name
  }

  deSerialize(object, engine) {
    super.deSerialize(object, engine)
    this.in = object.in
    this.name = object.name
  }

  serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      name: this.name
    })
  }

  link(port) {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  canLinkToPort(port) {
    if (port instanceof DefaultPortModel) {
      return this.in !== port.in
    }
    return true
  }

  createLinkModel() {
    let link = super.createLinkModel()
    return link || new DefaultLinkModel()
  }
}


export default DefaultPortModel