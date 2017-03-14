import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization, asyncAddBlock } from '~client/mobrender/redux/action-creators'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  mobilization: MobSelectors(state).getMobilization()
})

const mapActionsToProps = { onCreateBlock: asyncAddBlock }

export default provideHooks(redial)(connect(mapStateToProps, mapActionsToProps)(Page))
