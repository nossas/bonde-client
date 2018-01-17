//
// @route /mobilizations/:mobilization_id/blocks/create
//
import { connect } from 'react-redux'
import MobSelectors from '~client/mobrender/redux/selectors'
import { asyncAddBlock } from '~client/mobrender/redux/action-creators'
import Page from './page'

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization() || {}
})

const mapActionsToProps = { onCreateBlock: asyncAddBlock }

export default connect(mapStateToProps, mapActionsToProps)(Page)
