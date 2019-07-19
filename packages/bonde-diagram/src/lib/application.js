import {
  DiagramEngine,
  DiagramModel
} from 'storm-react-diagrams'
import { NodeFactory } from './node'


class Application {

  constructor() {
    this.diagramEngine = new DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerNodeFactory(new NodeFactory())

    this.newModel()
  }

  newModel() {
    this.activeModel = new DiagramModel()
    this.diagramEngine.setDiagramModel(this.activeModel)
  }

  getActiveDiagram() {
    return this.activeModel
  }

  getDiagramEngine() {
    return this.diagramEngine
  }
}

export default Application