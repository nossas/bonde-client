import { connect } from 'react-redux'
import EditorOld from './editor-old'
import MobSelectors from '~client/mobrender/redux/selectors'
import { handleEdit, handleCancelEdit } from '~client/mobrender/redux/action-creators'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization()
  }
}

const mapActionsToProps = {
  onEdit: () => handleEdit('widget'),
  onCancelEdit: () => handleCancelEdit('widget')
}

export default connect(mapStateToProps, mapActionsToProps)(EditorOld)
