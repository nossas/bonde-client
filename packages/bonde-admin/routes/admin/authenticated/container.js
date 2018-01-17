import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Loading } from '~client/components/await'
import { load } from '~client/account/redux/action-creators'
import fetchCurrentUser from '~client/account/queries/current-user'
import AuthSelectors from '~client/account/redux/selectors'
import { TechnicalIssues } from '~client/components/error/index'

class CurrentUserContainer extends Component {
  componentWillReceiveProps (nextProps, nextState) {
    const { currentUser } = this.props.data
    const { currentUser: nextCurrentUser } = nextProps.data

    if ((!currentUser && nextCurrentUser) || (currentUser && currentUser !== nextCurrentUser)) {
      this.props.load(nextCurrentUser)
    }
  }

  render () {
    const { children, data: { loading, currentUser, networkStatus } } = this.props
    const isLoading = loading && !currentUser
    // Apollo Client networkStatus code list: https://goo.gl/ZDyN1j
    const isError = networkStatus === 8
    return (
      <div className='current-user-container'>
        {isLoading
          ? <Loading />
          : (isError ? <TechnicalIssues /> : children)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: AuthSelectors(state).getUser()
})

export default graphql(fetchCurrentUser, {
  options: {
    fetchPolicy: 'network-only'
  }
})(
  connect(mapStateToProps, { load })(CurrentUserContainer)
)
