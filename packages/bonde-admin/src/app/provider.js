import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import crossStorage from 'cross-storage-client'
// save on store
import { createAction } from 'utils/redux'
import * as authTypes from 'account/redux/action-types'
import * as communityTypes from 'community/action-types'
// routing app
import AppRouting from 'pages/app'
import ApplicationContextTypes from './context/types'

const Loading = () => <h1>Signing...</h1>

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signing: false, signed: false, token: undefined }
  }

  getChildContext () {
    return { app: this.state }
  }

  componentDidMount () {
    const { location: { pathname } } = window
    const publicPaths = [/\/register\/?/, /\/subscriptions\/\d+\/edit\/?/, /\/playground\/?/]

    if (!publicPaths.some(pathRegex => pathRegex.test(pathname))) {
      crossStorage.onConnect()
        .then(() => {
          return crossStorage.get('auth', 'community')
        })
        .then(params => {
          const authJson = params[0]
          const communityJson = params[1]

          if (!authJson) {
            const err = new Error('unauthorized')
            err.status = 401
            return Promise.reject(err)
          }
          const { store } = this.props
          const { jwtToken } = JSON.parse(authJson)
          // authenticate on store
          const auth = { credentials: { 'access-token': jwtToken } }
          store.dispatch(createAction(authTypes.SIGN_SUCCESS, auth))

          // select community on store
          const community = JSON.parse(communityJson)
          if (community) {
            store.dispatch(createAction(communityTypes.REHYDRATE, community))
          }
          // authenticate on context
          this.setState({ signing: false, signed: true, token: jwtToken })

          return Promise.resolve()
        })
        .catch(err => {
          if (err && err.status === 401) {
            const domain = process.env.REACT_APP_DOMAIN_ADMIN_CANARY || 'http://admin-canary.bonde.devel:5002'
            window.location.href = `${domain}/auth/login?next=${window.location.href}`
          } else {
            console.log('err', err)
            this.setState({ signing: false, signed: false, token: undefined })
          }
        })
      }
  }

  render () {
    const { signing } = this.state
    const { locale, messages, store, apolloClient } = this.props

    return signing ? <Loading /> : (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ApolloProvider store={store} client={apolloClient()}>
            <AppRouting />
          </ApolloProvider>
        </Provider>
      </IntlProvider>
    )
  }
}

Application.childContextTypes = ApplicationContextTypes

export default Application
