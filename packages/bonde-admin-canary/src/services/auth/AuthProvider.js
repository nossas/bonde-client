import React from 'react'
import { Query } from 'react-apollo'
import { I18n } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import { graphqlApi } from 'services/graphql'
import authSession from './session'
import UserQuery from './user.graphql'

const AuthContext = React.createContext()

export const { Consumer } = AuthContext


class AuthProvider extends React.Component {
  state = { redirectToReferrer: false }

  handleLogout() {
    return authSession
      .logout()
      .then(() => {
        graphqlApi.resetStore()
        this.setState({ redirectToReferrer: true })
      })
  }
  
  render () {
    const { children, loading: Loading } = this.props

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/auth/login' }} />
    }

    return (
      <I18n ns='auth'>
        {(t) => (
          <Query query={UserQuery}>
            {({ loading, error, data }) => {
              
              if (loading) return <Loading />

              if (error || !data) {
                if (error.graphQLErrors.length === 1 && error.graphQLErrors[0].message === 'Signature has expired') {
                  this.handleLogout()
                } else {
                  return <h2>Houve algum problema na conexão GraphQL</h2>
                }
              }

              return (
                <AuthContext.Provider
                  value={{
                    user: data.user,
                    logout: this.handleLogout.bind(this)
                  }}
                >
                  {children}
                </AuthContext.Provider>
              )
            }}
          </Query>
        )}
      </I18n>
    )
  }
}

export default AuthProvider
