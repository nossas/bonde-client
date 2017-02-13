import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as BlockActions from '~mobilizations/blocks/action-creators'
import * as BlockSelectors from '~mobilizations/blocks/selectors'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as WidgetSelectors from '~mobilizations/widgets/selectors'

import MobilizationsEditPage from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !BlockSelectors.isLoaded(state) && promises.push(
      dispatch(BlockActions.asyncBlockFetch(params.mobilization_id))
    )
    !WidgetSelectors.isLoaded(state) && promises.push(
      dispatch(WidgetActions.asyncWidgetFetch(params.mobilization_id))
    )
    !MobilizationSelectors.hasCurrent(state) && promises.push(
      dispatch(MobilizationActions.select(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocks: BlockSelectors.getList(state),
  blockEditionMode: BlockSelectors.isEditionMode(state),
  blocksIsLoaded: BlockSelectors.isLoaded(state),
  blocksIsLoading: BlockSelectors.isLoading(state),
  widgets: WidgetSelectors.getList(state),
  widgetsIsLoaded: WidgetSelectors.isLoaded(state),
  widgetsIsLoading: WidgetSelectors.isLoading(state),
  auth: state.auth
})

export default provideHooks(redial)(connect(mapStateToProps)(MobilizationsEditPage))
