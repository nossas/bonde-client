import React from 'react'
import { AbstractNodeFactory } from 'storm-react-diagrams'
import { BetaNodeWidget } from '../widgets'
import { BetaNodeModel } from '../models'


class BetaNodeFactory extends AbstractNodeFactory<BetaNodeModelf> {
  constructor() {
    super('beta')
  }

  generateReactWidget(diagramEngine, node) {
    return <BetaNodeWidget diagramEngine={diagramEngine} node={node} />
  }

  getNewInstance(initialConfig) {
    return new BetaNodeModel(initialConfig)
  }
}

export default BetaNodeFactory