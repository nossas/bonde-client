import PropTypes from 'prop-types'
import React from 'react'
import ga from 'react-ga'
import Helmet from 'react-helmet'
import DevTools from '~client/components/dev-tools'
import { Loading } from '~client/components/await'
import { ZendeskWidget } from '~client/components/external-services'
import NotificationSystem from '~client/components/notification-system'

import { GoogleFontsLoader } from '~client/components/fonts'

class Application extends React.Component {
  componentDidMount () {
    ga.initialize('UA-26278513-30')
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ga.pageview(this.props.location.pathname)
    }
  }

  render () {
    const { children, loading } = this.props
    return (
      <div>
        <Helmet
          title='BONDE - Feito pra causar'
          link={[
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '32x32',
              href: require('exenv').canUseDOM ? require('~client/images/icon/favicon-32.png') : ''
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '16x16',
              href: require('exenv').canUseDOM ? require('~client/images/icon/favicon-16.png') : ''
            }
          ]}
        />
        <ZendeskWidget />
        {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
        {children}
        <NotificationSystem />
        {loading && <Loading />}
        <GoogleFontsLoader fonts='Source Sans Pro' />
      </div>
    )
  }
}

Application.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  loading: PropTypes.bool.isRequired
}

export default (Application)
