import React, { Component, PropTypes } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'

import * as arrayUtil from '~client/utils/array'
import { TechnicalIssues } from '~client/components/error'
import { GoogleFontsLoader } from '~client/components/fonts'
import Mobilization from '~client/mobrender/components/mobilization.connected'

var NotificationsSystem = () => <div />

if (require('exenv').canUseDOM) {
  require('~client/styles/main.scss')
  var theme = require('reapop-theme-wybo')
  NotificationsSystem = require('reapop').default
}

class CustomDomainPage extends Component {
  componentDidMount () {
    const isTest = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'test'
    if (!isTest) {
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
    const { host, mobilization } = this.props

    if (mobilization) {
      const {
        name,
        goal,
        facebook_share_title: facebookShareTitle,
        facebook_share_description: facebookShareDescription,
        facebook_share_image: facebookShareImage,
        header_font: headerFont,
        body_font: bodyFont
      } = mobilization

      return (
        <div>
          <Helmet
            title={name}
            meta={[
              { name: 'description', content: goal },
              { property: 'og:url', content: host },
              { property: 'og:title', content: facebookShareTitle },
              { property: 'og:description', content: facebookShareDescription },
              { property: 'og:image', content: facebookShareImage }
            ]}
          />
          <NotificationsSystem theme={theme} />
          <Mobilization />
          <GoogleFontsLoader fonts={[headerFont, bodyFont].filter(arrayUtil.distinct)} />
        </div>
      )
    }
    return <TechnicalIssues />
  }
}

CustomDomainPage.propTypes = {
  host: PropTypes.string,
  mobilization: PropTypes.object,
  blocks: PropTypes.array.isRequired,
  widgets: PropTypes.array.isRequired
}

export default CustomDomainPage
