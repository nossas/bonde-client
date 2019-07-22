import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'
import NodeWidget from './widget'
import NodeModel from './model'


class NodeFactory extends AbstractNodeFactory<NodeModel> {
  constructor() {
    super('node')
    console.log('NodeFactory', this)
  }

  generateReactWidget(diagramEngine, node) {
    return <NodeWidget diagramEngine={diagramEngine} node={node} />
  }

  getNewInstance(initialConfig) {
    console.log('getNewInstance')
    return new NodeModel(initialConfig)
  }
}

export default NodeFactory