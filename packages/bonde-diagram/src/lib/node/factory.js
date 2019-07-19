import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'
import NodeWidget from './widget'
import NodeModel from './model'


class NodeFactory extends AbstractNodeFactory {
  constructor() {
    super('message')
  }

  generateReactWidget(diagramEngine, node) {
    return <NodeWidget diagramEngine={diagramEngine} node={node} />
  }

  getNewInstance(initialConfig) {
    return new NodeModel(initialConfig)
  }
}

export default NodeFactory