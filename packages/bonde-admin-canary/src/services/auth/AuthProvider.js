import React from 'react'
import { I18n } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { graphqlApi } from 'services/graphql'
import authSession from './session'
import UserQuery from './user.graphql'
import PropTypes from 'prop-types'

const AuthContext = React.createContext()

export const { Consumer } = AuthContext

class AuthProvider extends React.Component {
  state = {
    fetching: true,
    user: undefined
  }

  componentDidMount () {
    graphqlApi
      .query({ query: UserQuery })
      .then(({ data }) => {
        this.setState({ user: data.user, fetching: false })
      })
      .catch(error => {
        const authErrors = [
          'Token invalid, user not found.',
          'Signature verification failed',
          'Invalid audience'
        ]

        if (typeof error === 'object' && authErrors.indexOf(error.graphQLErrors[0].message) !== -1) {
          this.handleLogout()
        }
      })
  }

  handleLogout () {
    return authSession
      .logout()
      .then(() => {
        graphqlApi.resetStore()
        this.setState({ fetching: false, user: undefined })
      })
  }

  render () {
    const { children, loading: Loading } = this.props

    if (!this.state.fetching && !this.state.user) {
      // Redirect user when is fetched current user but inválid token or session
      return <Redirect to={{ pathname: '/auth/login' }} />
    } else if (this.state.fetching) {
      return <Loading />
    }

    return (
      <I18n ns='auth'>
        {() => (
          <AuthContext.Provider
            value={{
              user: this.state.user,
              logout: this.handleLogout.bind(this)
            }}
          >
            {children}
          </AuthContext.Provider>
        )}
      </I18n>
    )
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.node,
  t: PropTypes.func
}

export default AuthProvider
