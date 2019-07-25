import { AbstractPortFactory } from 'storm-react-diagrams'
import { DefaultPortModel } from '../models'

class DefaultPortFactory extends AbstractPortFactory {
  constructor() {
    super('beta')
  }

  getNewInstance(initialConfig) {
    return new DefaultPortModel(true, 'unknown')
  }
}

export default DefaultPortFactory