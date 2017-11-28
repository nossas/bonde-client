import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Loading } from '~client/components/await'
import { load } from '~client/account/redux/action-creators'
import fetchCurrentUser from '~client/account/queries/current-user'
import AccountSelectors from '~client/account/redux/selectors'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

class CurrentUserContainer extends Component {
  componentDidMount () {
    // const { cookies } = this.props
    // console.log(cookies.getAll())
    if (this.props.data.currentUser && !this.props.user) {
      this.props.load(this.props.data.currentUser)
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    const { currentUser } = this.props.data
    const { currentUser: nextCurrentUser } = nextProps.data
    // console.log(currentUser)
    if ((!currentUser && nextCurrentUser) || (currentUser && currentUser !== nextCurrentUser)) {
      this.props.load(nextCurrentUser)
    }
  }

  render () {
    const { children, data: { loading, currentUser } } = this.props
    return (
      <div className='current-user-container'>
        {loading && !currentUser ? <Loading /> : (
          React.cloneElement(children, { currentUser })
        )}
      </div>
    )
  }
}

CurrentUserContainer.propTypes = {
  cookies: instanceOf(Cookies).isRequired
}

const mapStateToProps = state => ({
  user: AccountSelectors(state).getUser()
})

export default graphql(fetchCurrentUser, {
  options: {
    fetchPolicy: 'network-only'
  }
})(
  connect(mapStateToProps, { load })(withCookies(CurrentUserContainer))
)
