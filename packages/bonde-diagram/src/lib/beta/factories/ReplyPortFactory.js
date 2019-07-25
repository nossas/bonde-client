import { AbstractPortFactory } from 'storm-react-diagrams'
import { ReplyPortModel } from '../models'

class ReplyPortFactory extends AbstractPortFactory<BetaPortModel> {
  constructor() {
    super('reply')
  }

  getNewInstance(initialConfig) {
    return new ReplyPortModel('unknown')
  }
}

export default ReplyPortFactory