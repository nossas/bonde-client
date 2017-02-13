import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import Sidebar from '~components/navigation/sidebar'

import ApplicationContainer from './container'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    if (!MobilizationSelectors.isLoaded(state)) {
      return dispatch(MobilizationActions.asyncFetch(state.community.currentId))
    }
  }
}

const mapStateToProps = (state, props) => ({
  loading: state.mobilizations.list.loading,
  relationshipId: state.community.currentId,
  sidebarProps: Sidebar.getSidebarProps(state, props)
})

export default provideHooks(redial)(
  connect(mapStateToProps, MobilizationActions)(ApplicationContainer)
)
