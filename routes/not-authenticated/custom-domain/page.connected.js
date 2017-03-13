import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import DefaultServerConfig from '~server/config'
import * as BlockActions from '~mobilizations/blocks/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'

import Page from './page'

const redial = {
  fetch: ({ dispatch, host }) => {
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)
    const where = regex
      ? { slug: regex[1].replace(/^www\./, '') }
      : { custom_domain: host }

    return Promise.all([
      dispatch(MobilizationActions.asyncFilter(where)),
      dispatch(BlockActions.asyncBlockSelect(where)),
      dispatch(WidgetActions.asyncWidgetSelect(where))
    ])
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getList(state)[0],
  blocks: state.blocks.data,
  widgets: state.widgets.list.data
})

export default provideHooks(redial)(connect(mapStateToProps)(Page))
