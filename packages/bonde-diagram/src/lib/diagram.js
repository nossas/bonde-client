import React from 'react'
import WebFont from 'webfontloader'
import { DiagramWidget } from 'storm-react-diagrams'
import { DraggableItem } from './components'
import { NodeModel } from './node'


class Diagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
      }
    })
  }

  handleDrop(event) {
    const name = window.prompt('Insira sua mensagem:')
    const nodesCount = Object.keys(
      this.props.app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    ).length

    let node = null;
    // when the first message on diagram model should only has output port
    if (nodesCount === 0) {
      node = new NodeModel(name !== null ? name : "Node " + (nodesCount + 1))
      node.addOutPort("Out")
    } else {
      node = new NodeModel(name !== null ? name : "Node " + (nodesCount + 1))
      node.addInPort("In")
      node.addOutPort("Out")
    }
    
    const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event)
    
    node.x = points.x
    node.y = points.y
    
    this.props.app
      .getDiagramEngine()
      .getDiagramModel()
      .addNode(node)
    
    this.forceUpdate()
  }

  handleDragOver(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className='diagram-app'>
        <div className='diagram-tools'>
          <DraggableItem>Criar mensagem</DraggableItem>
          <DraggableItem>Fazer uma pergunta</DraggableItem>
          <DraggableItem>Criar  uma resposta</DraggableItem>
        </div>
        <div
          className='diagram-layer'
          onDrop={this.handleDrop.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
        >
          <DiagramWidget
            className='srd-bonde-diagram'
            diagramEngine={this.props.app.getDiagramEngine()}
          />
        </div>
      </div>
    )
  }
}

export default Diagram