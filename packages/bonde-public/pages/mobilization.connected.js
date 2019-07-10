import React from 'react'
import ReactGA from 'react-ga'
import getConfig from 'next/config'
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
import { FinishPostDonation } from 'bonde-webpage/lib/plugins/donation/components'


const { publicRuntimeConfig } = getConfig()

export const getSharedPath = (mobilization) => {
  const domain = publicRuntimeConfig.domainPublic

  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}

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

const imageUrl = '/static/images/check-mark-image.png'

const MyCustomPressurePlugin = (props) => (
  <PressurePlugin
    {...props}
    analyticsEvents={PressureAnalytics}
    graphqlClient={graphqlClient}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PressureTellAFriend,
        props: { imageUrl, href: getSharedPath(props.mobilization) }
      },
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
          FinishDefaultMessage: {
            component: FormTellAFriend,
            props: { imageUrl, href: getSharedPath(props.mobilization) }
          }
        }}
      />
    )
  },
  {
    kind: 'donation',
    component: (props) => (
      <DonationPlugin
        {...props}
        pagarmeKey={publicRuntimeConfig.pagarmeKey}
        analyticsEvents={DonationAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: {
            component: DonationTellAFriend,
            props: { imageUrl, href: getSharedPath(props.mobilization) }
          },
          FinishDonationMessage: {
            component: FinishPostDonation,
            props: { imageUrl, href: getSharedPath(props.mobilization) }
          }
        }}
      />
    )
  },
  {
    kind: 'pressure',
    component: MyCustomPressurePlugin
  },
  {
    kind: 'pressure-phone',
    component: MyCustomPressurePlugin
  },
  {
    kind: 'content',
    component: ContentPlugin
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
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont
    } = this.props.mobilization
    
    return (
      <Mobilization
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        colorScheme={colorScheme}
        headerFont={headerFont}
        bodyFont={bodyFont}
        extraWidgetProps={{
          mobilization: this.props.mobilization,
          editable: this.props.editable,
          plugins
        }}
      />
    )
  }
}

export default mobilizationConnect(MobilizationPreview)