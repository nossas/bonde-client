import { DefaultNodeWidget } from 'storm-react-diagrams'


class BaseNodeWidget extends DefaultNodeWidget {
  constructor(props) {
    super('srd-node', props)
    this.state = {}
  }
}

export default BaseNodeWidget