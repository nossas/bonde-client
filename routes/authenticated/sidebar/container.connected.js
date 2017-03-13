import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as CommunitySelectors from '~community/selectors'
import * as CommunityActions from '~community/action-creators'
import Sidebar from '~components/navigation/sidebar'

import Container from './container'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    !MobSelectors(state).mobilizationsIsLoaded() && promises.push(
      dispatch(MobActions.asyncFetchMobilizations(state.community.currentId))
    )
    // TODO: this fetch should be made a up level
    !CommunitySelectors.getList(state).length && promises.push(
      dispatch(CommunityActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  relationshipId: state.community.currentId,
  sidebarProps: Sidebar.getSidebarProps(state, props)
})

export default provideHooks(redial)(
  connect(mapStateToProps)(Container)
)
