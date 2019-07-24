import { NodeModel, Toolkit } from 'storm-react-diagrams'
import _ from 'lodash'
import BetaPortModel from './BetaPortModel'


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
  addInPort(label) {
    return this.addPort(new BetaPortModel(true, Toolkit.UID(), label))
  }

  addOutPort(label) {
    return this.addPort(new BetaPortModel(false, Toolkit.UID(), label))
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