import { DefaultNodeModel } from 'storm-react-diagrams'

class NodeModel extends DefaultNodeModel {
  constructor(name, color) {
    super('node');
    this.name = name;
    this.color = '#fff';
  }
}

export default NodeModel