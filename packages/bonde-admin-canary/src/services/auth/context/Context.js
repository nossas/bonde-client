import React from 'react'
import { Loading, Backdrop, Text, Title } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import CURRENT_USER from './currentUser.graphql'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {

      if (loading) {
        return (
          <Backdrop color='#FFFFFF'>
            <Text align='center' margin={{ top: '20vh' }}>
              <Loading size={109} />
            </Text>
            <Title.H3 align='center' lineHeight={1.29}>
              Preparando<br />
              o seu BONDE
            </Title.H3>
          </Backdrop>
        )
      }

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
