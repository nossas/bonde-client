import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BondeSessionProvider } from 'bonde-core-tools'
/* import { ToastContainer } from 'react-toastify' */
import { ProviderRedux } from './services/redux'
/* import { ProviderGraphQL } from './services/graphql' */
// import { ProviderLastLocation } from './services/router'
// import { SessionProvider, PrivateRoute, PublicRoute, Route } from './services/auth'
// Routes
import Dashboard from './scenes/Dashboard'
// import { Root as AuthRoot } from './scenes/Auth'
// import { NotFound } from './components'
// Styles
// import 'react-toastify/dist/ReactToastify.css'

const config = {
  loginUrl: '/auth/login',
  crossStorageUrl: process.env.REACT_APP_DOMAIN_CROSS_STORAGE || 'http://cross-storage.bonde.devel',
  graphqlApiUrl: process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel/graphql'
}

const Root = () => (
  <BondeSessionProvider config={config}>
    <ProviderRedux>
      <Router>
        <Switch>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
{/*         <React.Fragment>
        <ToastContainer
          className='BondeToastify'
          hideProgressBar={true}
        />
        <Router>
          <ProviderLastLocation>
            <Switch>
              <PublicRoute
                path='/auth'
                redirectTo='/admin'
                component={AuthRoot}
              />

              <PrivateRoute
                path='/admin'
                redirectTo='/auth/login'
                component={Dashboard}
              />

              <Redirect exact from='/' to='/admin' />

              <Route component={NotFound} />
            </Switch>
          </ProviderLastLocation>
        </React.Fragment> */}
      </Router>
    </ProviderRedux>
  </BondeSessionProvider>
)

export default Root
