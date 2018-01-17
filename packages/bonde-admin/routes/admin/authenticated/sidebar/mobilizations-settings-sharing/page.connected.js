//
// @route /mobilizations/:mobilization_id/sharing
//
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import Page from './page'

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilization()
})

export default connect(mapStateToProps)(Page)
