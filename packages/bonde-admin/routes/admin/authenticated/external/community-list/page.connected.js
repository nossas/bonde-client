//
// @route /community
//
import { connect } from 'react-redux'

import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: CommunitySelectors.isLoading(state),
  isLoaded: CommunitySelectors.isLoaded(state),
  communities: CommunitySelectors.getList(state)
})

export default connect(mapStateToProps, CommunityActions)(Page)
