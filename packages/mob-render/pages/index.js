import React from 'react'
import withRedux from 'next-redux-wrapper'

// Intl
import { IntlProvider } from 'react-intl'
import { locale, messages } from '../intlReducer'

// ApolloClient
import { ApolloProvider } from 'react-apollo'
import apolloClient from '../apolloClient'

// Store
import configureStore from '../configureStore'

// Webviewer
import {
  Mobilization as MobilizationApp,
  Reducer as MobilizationRedux
} from '../webviewer/webviewer'
import styles from './../webviewer/main.dba55199cd8fb7024923.css'

class Page extends React.Component {
  static async getInitialProps ({ store }) {
    const { dispatch, getState } = store
    const host = getState().sourceRequest.host
    const appDomain = process.env.APP_DOMAIN || 'bonde.devel'

    if (host) {
      const {
        asyncFilterMobilization,
        asyncFilterBlock,
        asyncFilterWidget
      } = MobilizationRedux.actions
      // eslint-disable-next-line
      const regex = host.match(`(.+)\.${appDomain}`)

      const where = regex
        ? { slug: regex[1].replace(/^www\./, '') }
        : { custom_domain: host }

      await dispatch(asyncFilterMobilization(where))
      await dispatch(asyncFilterBlock(where))
      await dispatch(asyncFilterWidget(where))
    }
  }

  render () {
    return (
      <div>
        <style global jsx>{styles}</style>
        <IntlProvider locale={locale} messages={messages}>
          <ApolloProvider client={apolloClient()}>
            <MobilizationApp editable={false} />
          </ApolloProvider>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { mobilizations: { list: { currentId, data, isLoaded } } } = state
  const composeProps = {}

  if (currentId) {
    composeProps.mobilization = data.filter(({ id }) => id === currentId)[0]
  }

  return { isLoaded, ...composeProps }
}

export default withRedux(configureStore, mapStateToProps)(Page)
