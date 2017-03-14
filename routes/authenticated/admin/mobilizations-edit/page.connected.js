import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import { selectMobilization, asyncFetchBlocks, asyncFetchWidgets } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const selectors = MobSelectors(getState())
    const promises = []

    !selectors.getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )

    if (selectors.mobilizationIsNeedReload()) {
      promises.push(dispatch(asyncFetchBlocks(params.mobilization_id)))
      promises.push(dispatch(asyncFetchWidgets(params.mobilization_id)))
    }
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization(),
    renderIsLoading: selectors.renderIsLoading()
  }
}

export default provideHooks(redial)(connect(mapStateToProps)(Page))
