import React from 'react'
import WebFont from 'webfontloader'
import { DiagramWidget } from 'storm-react-diagrams'
import { NodeModel } from './node'

class DraggableItem extends React.Component {
  render() {
    const { color, model } = this.props
    return (
      <div
        draggable
        className='draggable-item'
        style={{ borderColor: color }}
        onDragStart={(event) => {
          event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
        }}
      >
        {this.props.name}
      </div>
    )
  }
}


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
    /*const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))*/
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
          <DraggableItem model={{ type: 'text' }} name='Criar mensagem' />
          <DraggableItem model={{ type: 'ask' }} name='Fazer uma pergunta' />
          <DraggableItem model={{ type: 'reply' }} name='Criar  uma resposta' />
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