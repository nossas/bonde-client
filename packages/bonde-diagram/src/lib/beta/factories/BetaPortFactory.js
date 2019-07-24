import { AbstractPortFactory } from 'storm-react-diagrams'
import { BetaPortModel } from '../models'

class BetaPortFactory extends AbstractPortFactory<BetaPortModel> {
  constructor() {
    super('beta')
  }

  getNewInstance(initialConfig) {
    return new BetaPortModel(true, 'unknown')
  }
}

export default BetaPortFactory