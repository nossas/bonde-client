import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization, asyncFetchWidgets, asyncUpdateWidget } from '~client/mobrender/redux/action-creators'

import Container from './container'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const promises = []
    const selectors = MobSelectors(getState())

    !selectors.getMobilization() && promises.push(
      dispatch(selectMobilization(params.mobilization_id))
    )
    !selectors.widgetsIsLoaded() && promises.push(
      dispatch(asyncFetchWidgets(params.mobilization_id))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => {
  const { params: { widget_id } } = props
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget(widget_id)
  }
}

const mapActionsToProps = { asyncWidgetUpdate: asyncUpdateWidget }

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionsToProps)(Container)
)
