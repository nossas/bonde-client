import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as CommunitySelectors from '~community/selectors'
import Sidebar from '~components/navigation/sidebar'

import Container from './container'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    const selectors = MobSelectors(state)

    const community = CommunitySelectors.getCurrent(state)
    const shouldMakeFetch = community &&
      !selectors.mobilizationsIsLoaded() &&
      !selectors.mobilizationsIsLoading()

    shouldMakeFetch && promises.push(
      dispatch(MobActions.asyncFetchMobilizations(community.id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  community: CommunitySelectors.getCurrent(state),
  loading: MobSelectors(state, props).mobilizationsIsLoading(),
  sidebarProps: Sidebar.getSidebarProps(state, props)
})

export default provideHooks(redial)(
  connect(mapStateToProps)(Container)
)
