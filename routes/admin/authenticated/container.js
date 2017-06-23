import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Loading } from '~client/components/await'
import { load } from '~client/account/redux/action-creators'
import fetchCurrentUser from '~client/account/queries/current-user'
import AuthSelectors from '~client/account/redux/selectors'

class CurrentUserContainer extends Component {

  componentDidMount () {
    if (this.props.data.currentUser && !this.props.user) {
      this.props.load(this.props.data.currentUser)
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      this.props.load(nextProps.data.currentUser)
    }
  }

  render () {
    const { children, data: { loading, currentUser }  } = this.props
    return (
      <div className='current-user-container'>
        {loading && !currentUser ? <Loading /> : (
          React.cloneElement(children, { currentUser })
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: AuthSelectors(state).getUser()
})

export default graphql(fetchCurrentUser)(
  connect(mapStateToProps, { load })(CurrentUserContainer)
)
