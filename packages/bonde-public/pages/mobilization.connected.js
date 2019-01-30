import React from 'react'
import ReactGA from 'react-ga'
// MOBILIZATION and external dependencies
import { Mobilization } from 'bonde-webpage'
import { PluggableWidget, FinishMessageCustom } from 'bonde-webpage/lib/ux'
// DRAFT PLUGIN and external dependencies
import { DraftPlugin } from 'bonde-webpage/lib/plugins/draft'
// FORM PLUGIN and external dependencies
import FormPlugin from './plugin-form.connected'
import { FormAnalytics, FormTellAFriend } from 'bonde-webpage/lib/plugins/form'
// CONTENT PLUGIN and external dependencies
import { ContentPlugin } from 'bonde-webpage/lib/plugins/content'
/*import { decorator } from '@/components/editor-draft-js/Toolbar'*/
// PRESSURE PLUGIN and external dependencies
import PressurePlugin from './plugin-pressure.connected'
import { PressureAnalytics, PressureTellAFriend } from 'bonde-webpage/lib/plugins/pressure'
import graphqlClient from '../apolloClient'
// PRESSURE PLUGIN and external dependencies
import DonationPlugin from './plugin-donation.connected'
import { DonationAnalytics, DonationTellAFriend } from 'bonde-webpage/lib/plugins/donation'
// TODO: Icons should be inside plugin reference.
/*import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'*/

import { connect } from 'react-redux'
import { selectors as MobilizationSelectors } from 'bonde-webpage/lib/redux'

const mapStateToProps = (state, props) => {
  const query = MobilizationSelectors(state, props)
  return {
    mobilization: query.getMobilization() || query.getMobilizations()[0],
    blocks: query.getBlocks(),
    blocksIsLoaded: query.blocksIsLoaded(),
    widgets: query.getWidgets()
  }
}

const mobilizationConnect = connect(mapStateToProps)

const MyCustonPressurePlugin = (props) => (
  <PressurePlugin
    {...props}
    analyticsEvents={PressureAnalytics}
    graphqlClient={graphqlClient}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: { component: PressureTellAFriend },
    }}
  />
)

const plugins = [
  { 
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  },
  {
    kind: 'form',
    component: (props) => (
      <FormPlugin
        {...props}
        analyticsEvents={FormAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: FormTellAFriend },
        }}
      />
    )
  },
  {
    kind: 'donation',
    component: (props) => (
      <DonationPlugin
        {...props}
        analyticsEvents={DonationAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: DonationTellAFriend },
        }}
      />
    )
  },
  {
    kind: 'pressure',
    component: MyCustonPressurePlugin
  },
  {
    kind: 'pressure-phone',
    component: MyCustonPressurePlugin
  },
  {
    kind: 'content',
    component: (props) => (
      <ContentPlugin
        {...props}
        decorator={{}}
      />
    )
  }
]

class MobilizationPreview extends React.Component {

  componentDidMount () {
    const isTest = false
    if (!isTest && this.props.mobilization) {
      const { mobilization } = this.props

      ReactGA.initialize('UA-26278513-30')
      ReactGA.pageview('/' + mobilization.slug)

      if (mobilization.google_analytics_code) {
        ReactGA.initialize(
          mobilization.google_analytics_code,
          { gaOptions: { name: 'MobilizationTracker' } }
        )
        ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
      }
    }
  }

  render () {
    // Properties received by HOC
    const { blocks, widgets } = this.props
    return (
      <Mobilization
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        extraWidgetProps={{
          mobilization: this.props.mobilization,
          editable: this.props.editable,
          plugins: plugins
        }}
      />
    )
  }
}

export default mobilizationConnect(MobilizationPreview)