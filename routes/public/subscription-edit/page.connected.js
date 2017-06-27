import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import {
  asyncSubscriptionDelete,
  asyncSubscriptionFetch,
  setModificationType,
  appendAnimationStack,
  removeAnimationStack
} from '~client/subscriptions/redux/action-creators'
import SubscriptionEditSelectors from '~client/subscriptions/redux/selectors/edit'
import Page from './page'

const redial = {
  fetch: ({ dispatch, params, query }) => {
    return dispatch(asyncSubscriptionFetch({
      id: params.id,
      token: query.token
    }))
  }
}

const mapStateToProps = state => {
  const selectors = SubscriptionEditSelectors(state)
  return {
    modificationType: selectors.getModificationType(),
    animationStack: selectors.getAnimationStack(),
    url: state.sourceRequest.url,
    card: selectors.getCard()
  }
}

const mapDispatchToProps = {
  asyncSubscriptionDelete,
  setModificationType,
  appendAnimationStack,
  removeAnimationStack
}

export default injectIntl(provideHooks(redial)(
  connect(mapStateToProps, mapDispatchToProps)(Page)
))
