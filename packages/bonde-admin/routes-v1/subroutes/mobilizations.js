import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import { Loading } from '~client/components/await'

// Redux
import { selectMobilization, asyncFetchWidgets, asyncFetchBlocks } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

// Pages
import MobilizationList from '~routes/admin/authenticated/sidebar/mobilizations-list/page.connected'
import MobilizationsNew from '~routes/admin/authenticated/sidebar/mobilizations-new/page.connected'
import MobilizationsEdit from '~routes/admin/authenticated/sidebar/mobilizations-edit/page.connected'
import MobilizationsLaunch from '~routes/admin/authenticated/sidebar/mobilizations-launch/page.connected'
import MobilizationsLaunchEnd from '~routes/admin/authenticated/sidebar/mobilizations-launch-end/page.connected'
import BlockCreate from '~routes/admin/authenticated/sidebar/blocks-create/page.connected'
import TemplateList from '~routes/admin/authenticated/sidebar/templates-list/page.connected'
import TemplateCreate from '~routes/admin/authenticated/sidebar/templates-create/page.connected'
import TemplateChoose from '~routes/admin/authenticated/sidebar/templates-choose/page.connected'
import TemplateChooseCustom from '~routes/admin/authenticated/sidebar/templates-choose-custom/page.connected'

// SubRoutes
import MobilizationsSettings from '~root/routes-v1/subroutes/mobilizations-settings'
import WidgetsRoutes from '~root/routes-v1/subroutes/widgets'

const stateToProps = (state) => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    blocksIsLoaded: selectors.blocksIsLoaded(),
    widgetsIsLoaded: selectors.widgetsIsLoaded(),
    reload: selectors.mobilizationIsNeedReload()
  }
}

const actionsToProps = {
  select: selectMobilization,
  fetchWidgets: asyncFetchWidgets,
  fetchBlocks: asyncFetchBlocks
}

const InsideMobilization = connect(stateToProps, actionsToProps)(class extends React.Component {
  componentDidMount () {
    const promises = []
    const {
      match: { params: { mobilization_id: id } },
      mobilization,
      blocksIsLoaded,
      widgetsIsLoaded,
      reload,
      select,
      fetchBlocks,
      fetchWidgets
    } = this.props

    if (!mobilization && id) promises.push(select(id))
    if ((!blocksIsLoaded || reload) && id) promises.push(fetchBlocks(id))
    if ((!widgetsIsLoaded || reload) && id) promises.push(fetchWidgets(id))

    return Promise.all(promises)
  }

  render () {
    const {
      match: { path, params: { mobilization_id: id } },
      mobilization,
      blocksIsLoaded,
      widgetsIsLoaded
    } = this.props

    const hasId = id && !isNaN(id)

    return (!mobilization || !blocksIsLoaded || !widgetsIsLoaded) && hasId ? <Loading /> : (
      <React.Fragment>
        <Route exact path={`${path}/blocks/create`} component={BlockCreate} />
        <Route exact path={`${path}/edit`} component={MobilizationsEdit} />
        <Route exact path={`${path}/launch`} component={MobilizationsLaunch} />
        <Route exact path={`${path}/launch/end`} component={MobilizationsLaunchEnd} />
        <Route exact path={`${path}/templates/create`} component={TemplateCreate} />
        <Route exact path={`${path}/templates/choose`} component={TemplateChoose} />
        <Route exact path={`${path}/templates/choose/custom`} component={TemplateChooseCustom} />

        <Route path={`${path}/settings`} component={MobilizationsSettings} />
        <Route path={`${path}/widgets/:widget_id`} component={WidgetsRoutes} />
      </React.Fragment>
    )
  }
})

export default ({ match: { path } }) => (
  <React.Fragment>
    <Route exact path={`${path}`} component={MobilizationList} />
    <Route exact path={`${path}/new`} component={MobilizationsNew} />
    <Route exact path={`${path}/templates/list`} component={TemplateList} />
    <Route path={`${path}/:mobilization_id`} component={InsideMobilization} />
  </React.Fragment>
)
