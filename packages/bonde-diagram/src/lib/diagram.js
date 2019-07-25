import React from 'react'
import WebFont from 'webfontloader'
import { DiagramWidget } from 'storm-react-diagrams'
import { DraggableItem } from './components'
import { MessageNodeModel } from './beta/models'
import { IconMessage, IconQuickReply } from './components/icons'

class Diagram extends React.Component {

  static DATATRANSFER_KEY = 'srd-diagram-model'

  constructor(props) {
    super(props)
    this.state = {
      entitySelected: undefined
    }
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
      }
    })
  }

  handleDrop(event) {
    const model = JSON.parse(event.dataTransfer.getData(this.DATATRANSFER_KEY))
    console.log('model', model)
    const nodesCount = Object.keys(
      this.props.app
        .getDiagramEngine()
        .getDiagramModel()
        .getNodes()
    ).length

    let node = null;
    // when the first message on diagram model should only has output port
    if (nodesCount === 0 && model.kind === 'text') {
      node = new MessageNodeModel("Node " + (nodesCount + 1), model.kind)
      node.addOutPort('Out')
    } else if (model.kind === 'text') {
      node = new MessageNodeModel("Node " + (nodesCount + 1), model.kind)
      node.addOutPort('Out')
      node.addInPort('In')
    } else if (model.kind === 'quick_reply'){
      node = new MessageNodeModel("Node " + (nodesCount + 1), model.kind)
      node.addInPort('In')
      node.addQuickReply('Texto do botão')
    } else {
      // TODO: throws exception
      console.error('não é possível adicionar esse tipo de mensagem agora')
    }
    
    const points = this.props.app.getDiagramEngine().getRelativeMousePoint(event)
    
    console.log('points', points)

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

  handleDragStart(model, event) {
    console.log(model)
    console.log(event)
    event.dataTransfer.setData(this.DATATRANSFER_KEY, JSON.stringify(model))
  }

  render() {
    return (
      <div className='diagram-app'>
        <div className='diagram-tools'>
          <DraggableItem
            model={{ kind: 'text' }}
            onDragStart={this.handleDragStart.bind(this)}
          >
            <IconMessage />
            <span>Criar mensagem</span>
          </DraggableItem>
          <DraggableItem
            model={{ kind: 'quick_reply' }}
            onDragStart={this.handleDragStart.bind(this)}
          >
            <IconQuickReply />
            <span>Fazer uma pergunta</span>
          </DraggableItem>
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