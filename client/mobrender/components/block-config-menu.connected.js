import { connect } from 'react-redux'
import Selectors from '../redux/selectors'
import { asyncMoveUp, asyncMoveDown, asyncUpdateBlock, handleEdit, asyncDestroyBlock, asyncAddBlock } from '../redux/action-creators'
import BlockConfigMenu from './block-config-menu'

const mapStateToProps = (state, props) => {
  const selectors = Selectors(state, props)
  return {
    canMoveUp: selectors.canMoveUp(),
    canMoveDown: selectors.canMoveDown()
  }
}

const mapActionsToProps = (dispatch, props) => ({
  moveUp: asyncMoveUp,
  moveDown: asyncMoveDown,
  update: asyncUpdateBlock,
  onEdit: handleEdit,
  destroy: asyncDestroyBlock,
  duplicate: ({ mobilization_id, bg_class, bg_image, position, hidden, name, menu_hidden }) => {
    // Widgets clean
    const widgetsAttributes = props.widgets.map(
      ({ kind, settings, sm_size, md_size, lg_size }) => {
        return { kind, settings, sm_size, md_size, lg_size }
      }
    )

    const block = {
      mobilization_id,
      bg_class,
      bg_image,
      hidden,
      name,
      menu_hidden,
      widgets_attributes: widgetsAttributes,
      position: position + 1
    }

    dispatch(asyncAddBlock(block))
  }
})

export default connect(mapStateToProps, mapActionsToProps)(BlockConfigMenu)
