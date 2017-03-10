import { connect } from 'react-redux'
import Selectors from '../redux/selectors'
import { asyncMoveUp, asyncMoveDown, asyncUpdateBlock, handleEdit, asyncDestroyBlock } from '../redux/action-creators'
import BlockConfigMenu from './block-config-menu'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  return {
    canMoveUp: selectors.canMoveUp(),
    canMoveDown: selectors.canMoveDown()
  }
}

const mapActionsToProps = {
  moveUp: asyncMoveUp,
  moveDown: asyncMoveDown,
  update: asyncUpdateBlock,
  onEdit: handleEdit,
  destroy: asyncDestroyBlock
}

export default connect(mapStateToProps, mapActionsToProps)(BlockConfigMenu)
