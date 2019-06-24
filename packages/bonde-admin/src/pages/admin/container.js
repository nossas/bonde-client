import React from 'react'
import { Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'
import FetchCurrentUser from 'account/queries/current-user'
import { connect } from 'react-redux'
import { load } from 'account/redux/action-creators'
import { Loading } from 'components/await'

// Routes
import BetaBotPage from './bot'
import CommunityListPage from './communities/list'
import CommunityCreatePage from './communities/create'
import SidebarContainer from './sidebar'
import PrivateRoute from './private-route'

class Logged extends React.Component {
  componentDidMount () {
    if (this.props.user) {
      this.props.load(this.props.user)
    }
  }

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
          component={BetaBotPage}
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
          path='/'
          component={SidebarContainer}
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
