import { DefaultPortModel, NodeModel, Toolkit } from 'storm-react-diagrams'
import _ from 'lodash'

export default class extends NodeModel {
  constructor(name, kind) {
    super('node')
    this.name = name;
    this.kind = kind;
  }

  addInPort(label) {
    return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label))
  }

  addOutPort(label) {
    return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label))
  }

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