import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DefaultServerConfig from '~server/config'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, host }) => {
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)
    const where = regex
      ? { slug: regex[1].replace(/^www\./, '') }
      : { custom_domain: host }

    const promises = []
    if (!MobSelectors(getState()).mobilizationsIsLoaded()) {
      promises.push(dispatch(MobActions.asyncFilterMobilization(where)))
      promises.push(dispatch(MobActions.asyncFilterBlock(where)))
      promises.push(dispatch(MobActions.asyncFilterWidget(where)))
    }
    return Promise.all(promises)
  }
}

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilizations()[0],
  host: state.sourceRequest.host,
  protocol: state.sourceRequest.protocol
})

const mapDispatchToProps = {
  asyncFilterWidget: MobActions.asyncFilterWidget
}

export default provideHooks(redial)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
)
