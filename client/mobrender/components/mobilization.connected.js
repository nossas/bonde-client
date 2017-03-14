import { connect } from 'react-redux'
import { asyncUpdateBlock } from '../redux/action-creators'
import { EDIT_KEY } from './block-config-menu'
import Selectors from '../redux/selectors'

import Mobilization from './mobilization'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  return {
    mobilization: selectors.getMobilization() || selectors.getMobilizations()[0],
    blocks: selectors.getBlocks(),
    widgets: selectors.getWidgets(),
    blockEditionMode: selectors.getEditing() == EDIT_KEY
  }
}

const mapActionsToProps = {
  blockUpdate: asyncUpdateBlock
}

export default connect(mapStateToProps, mapActionsToProps)(Mobilization)

