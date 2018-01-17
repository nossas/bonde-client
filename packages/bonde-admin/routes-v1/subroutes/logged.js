import React from 'react'
import { Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'
import FetchCurrentUser from '~client/account/queries/current-user'
import { connect } from 'react-redux'
import { load } from '~client/account/redux/action-creators'
import { Loading } from '~client/components/await'

// Routes
import Bot from '~routes/admin/authenticated/external/bot/page'
import CommunityListPage from '~routes/admin/authenticated/external/community-list/page.connected'
import CommunityCreatePage from '~routes/admin/authenticated/external/community-new/page.connected'
import LogoutPage from '~routes/admin/authenticated/logout/page.connected'
import SidebarRoute from './sidebar'
import PrivateRoute from '~root/routes-v1/private-route'

class Logged extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.load(nextProps.user)
    }
  }

  render () {
    return this.props.loading ? <Loading /> : (
      <Switch>
        <PrivateRoute
          exact
          path='/bot'
          component={Bot}
        />
        <PrivateRoute
          exact
          path='/communities'
          component={CommunityListPage}
        />
        <PrivateRoute
          exact
          path='/communities/new'
          component={CommunityCreatePage}
        />
        <PrivateRoute
          exact
          path='/logout'
          component={LogoutPage}
        />
        <PrivateRoute
          path='/'
          component={SidebarRoute}
        />
      </Switch>
    )
  }
}

const config = {
  options: { fetchPolicy: 'network-only' },
  props: ({ ownProps, data: { loading, currentUser } }) => ({
    loading,
    user: currentUser
  })
}

export default graphql(FetchCurrentUser, config)(
  connect(undefined, { load })(Logged)
)
