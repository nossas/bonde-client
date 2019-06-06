import React from 'react'
import { Route, Redirect as RedirectComponent } from 'react-router-dom'
import { connect } from 'react-redux'
import * as paths from 'paths'
import AccountSelectors from 'account/redux/selectors'
import * as CommunitySelectors from 'community/selectors'

const Redirect = ({ pathname, location }) => (
  <RedirectComponent to={{ pathname, state: { from: location } }} />
)

const PrivateRoute = ({
  component: Component,
  exact = false,
  path,
  authenticated,
  hasCommunity,
  ...rest
}) => (
  <Route
    {...rest}
    exact={exact}
    path={path}
    render={props => {
      const { location: { pathname } } = rest

      const isRoot = pathname === '/'
      const isCommunity = pathname.match(/\/communities\/?/)
      const isMobilizations = pathname.match(/\/mobilizations\/?/)

      const mobilizationsPath = paths.mobilizations()
      const communitiesPath = paths.communityList()
      const loginPath = paths.login()

      const redir = destination => ({
        [mobilizationsPath]: authenticated && hasCommunity && isRoot && !isMobilizations,
        [communitiesPath]: authenticated && !hasCommunity && !isCommunity,
        [loginPath]: !authenticated
      }[destination])

      if (redir(mobilizationsPath)) {
        return <Redirect {...props} pathname={mobilizationsPath} />
      } else if (redir(communitiesPath)) {
        return <Redirect {...props} pathname={communitiesPath} />
      } else if (redir(loginPath)) {
        return <Redirect {...props} pathname={loginPath} />
      } else {
        return <Component {...props} />
      }
    }}
  />
)

const mapStateToProps = state => ({
  authenticated: AccountSelectors(state).getCredentials(),
  hasCommunity: !!CommunitySelectors.getCurrent(state)
})

export default connect(mapStateToProps)(PrivateRoute)
