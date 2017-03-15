import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DefaultServerConfig from '~server/config'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const redial = {
  fetch: ({ dispatch, host }) => {
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)
    const where = regex
      ? { slug: regex[1].replace(/^www\./, '') }
      : { custom_domain: host }

    return Promise.all([
      dispatch(MobActions.asyncFilterMobilization(where)),
      dispatch(MobActions.asyncFilterBlock(where)),
      dispatch(MobActions.asyncFilterWidget(where))
    ])
  }
}

const mapStateToProps = (state, props) => ({
  mobilization: MobSelectors(state, props).getMobilizations()[0]
})

export default provideHooks(redial)(connect(mapStateToProps)(Page))
