import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'
import { MessageNodeWidget } from '../widgets'
import { MessageNodeModel } from '../models'


class MessageNodeFactory extends AbstractNodeFactory<BetaNodeModelf> {
  constructor() {
    super('message')
  }

  generateReactWidget(diagramEngine, node) {
    return <MessageNodeWidget diagramEngine={diagramEngine} node={node} />
  }

  getNewInstance(initialConfig) {
    return new MessageNodeModel(initialConfig)
  }
}

export default MessageNodeFactory