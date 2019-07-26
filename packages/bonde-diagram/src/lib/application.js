import {
  DiagramEngine,
  DiagramModel
} from 'storm-react-diagrams'
import {
  MessageNodeFactory,
  DefaultPortFactory,
  ReplyPortFactory
} from './beta/factories'

class Application {

  constructor() {
    this.diagramEngine = new DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.diagramEngine.registerNodeFactory(new MessageNodeFactory())
    this.diagramEngine.registerPortFactory(new DefaultPortFactory())
    this.diagramEngine.registerPortFactory(new ReplyPortFactory())

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