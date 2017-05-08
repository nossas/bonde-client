import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'

import * as arrayUtil from '~client/utils/array'
import { TechnicalIssues } from '~client/components/error'
import { GoogleFontsLoader } from '~client/components/fonts'
import Mobilization from '~client/mobrender/components/mobilization.connected'

if (require('exenv').canUseDOM) {
  require('~client/styles/main.scss')
}

class CustomDomainPage extends Component {
  componentDidMount () {
    if (require('exenv').canUseDOM) {
      //
      // Fix scroll when loads the client bundle.
      // After the initial render that the server responds.
      //
      if (window.location.hash) {
        const hashTarget = document.querySelector(window.location.hash)
        hashTarget && hashTarget.scrollIntoView()
      }

      //
      // Get the current scroll position from the initial render
      // to prevent the browser rescroll to top when the client bundle loads.
      //
      if (window.scrollPosition) {
        const blocksList = document.getElementById('blocks-list')
        const propagateScroll = target => { target.scrollTop = window.scrollPosition }
        blocksList && propagateScroll(blocksList)
      }
    }

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

      const url = mobilization.custom_domain || host

      return (
        <div>
          <Helmet
            title={name}
            meta={[
              { name: 'description', content: goal },
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:title', content: facebookShareTitle },
              { name: 'twitter:description', content: facebookShareDescription },
              { name: 'twitter:image', content: facebookShareImage },
              { property: 'twitter:url', content: url },
              { property: 'og:url', content: url },
              { property: 'og:title', content: facebookShareTitle },
              { property: 'og:description', content: facebookShareDescription },
              { property: 'og:image', content: facebookShareImage }
            ]}
          />
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
