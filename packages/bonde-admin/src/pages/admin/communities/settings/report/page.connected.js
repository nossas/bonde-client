//
// @route /community/report
//
import { connect } from 'react-redux'

import * as CommunityActions from 'community/action-creators'
import * as CommunitySelectors from 'community/selectors'

import Page from './page'

const mapStateToProps = state => ({
  community: CommunitySelectors.getCurrent(state)
})

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit,
  ...CommunityActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
