import { NodeModel, Toolkit } from 'storm-react-diagrams'
import _ from 'lodash'
import DefaultPortModel from './DefaultPortModel'
import ReplyPortModel from './ReplyPortModel'


class BetaNodeModel extends NodeModel {
  constructor(name, kind) {
    super('beta')
    this.name = name;
    this.kind = kind;
  }
  // Funções que devem ser implementadas
  deSerialize(object, engine) {
    super.deSerialize(object, engine)
    this.name = object.name
    this.kind = object.kind
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      kind: this.kind
    });
  }

  // Funções customizadas
  addQuickReply(text) {
    return this.addPort(new ReplyPortModel(text, Toolkit.UID()))
  }

  addInPort(name) {
    return this.addPort(new DefaultPortModel(true, name, Toolkit.UID()))
  }

  addOutPort(name) {
    return this.addPort(new DefaultPortModel(false, name, Toolkit.UID()))
  }

  getInPorts() {
    return _.filter(this.ports, portModel => {
      return portModel.in
    })
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => {
      return !portModel.in
    })
  }

  setName(name) {
    this.name = name
  }
}

export default BetaNodeModel