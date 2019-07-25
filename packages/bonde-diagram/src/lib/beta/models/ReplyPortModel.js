import _ from 'lodash'
import { DefaultLinkModel, PortModel } from 'storm-react-diagrams'


class ReplyPortModel extends PortModel {
  constructor(name, text, id) {
    super(name, 'reply', id)
    this.in = false
    this.text = text
  }

  deSerialize(object, engine) {
    super.deSerialize(object, engine)
    this.in = object.in
    this.text = object.text
  }

  serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      text: this.text
    })
  }

  link(port) {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  canLinkToPort(port) {
    if (port instanceof ReplyPortModel) {
      return this.in !== port.in
    }
    return true
  }

  createLinkModel() {
    let link = super.createLinkModel()
    return link || new DefaultLinkModel()
  }

  changeText(text) {
    this.text = text
  }
}


export default ReplyPortModel