import React from 'react'
import { Loading } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import CURRENT_USER from './currentUser.graphql'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      
      if (loading) return <Loading />
      
      if (error) console.log('error', error)

      return (
        <AuthContext.Provider value={(data ? data.currentUser : undefined)}>
          {children}
        </AuthContext.Provider>
      )
    }}
  </Query>
)

export default AuthProvider
