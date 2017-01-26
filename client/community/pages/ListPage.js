import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'react-mixin'
import { Link, Navigation } from 'react-router'

// Global module dependencies
import * as paths from '../paths'
import { Loading } from '~components/await'

// Current module dependencies
import { fetch, select } from '../actions'
import { ListItem } from '../components'

// @revert @decorate(Navigation)
class ListPage extends Component {
  componentDidMount () {
    const { isLoaded, fetch } = this.props
    if (!isLoaded) fetch()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoaded && nextProps.data.length === 0) {
      this.transitionTo(paths.add())
    }
  }

  onClickItem (id) {
    this.props.select(id)
    this.transitionTo('/')
  }

  render () {
    const { loading, isLoaded, data, user } = this.props

    return !loading ? (
      <div>
        <h1>Olá {user.first_name},</h1>
        <h2>Escolha uma das suas comunidades</h2>
        {isLoaded ? (
          <div className='rounded bg-white'>
            {data && data.map((community, key) => (
              <ListItem
                key={`list-item-${key}`}
                onClick={this.onClickItem.bind(this)}
                community={community}
              />
            ))}
          </div>
        ) : null}
        <p className='white center'>ou <Link to={paths.add()}>Crie uma nova comunidade</Link></p>
      </div>
    ) : <Loading />
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.community.loading,
  isLoaded: state.community.isLoaded,
  data: state.community.data,
  currentId: state.community.currentId,
  credentials: state.auth.credentials
})

const mapActionsToProps = { fetch, select }

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  fetch: () => dispatchProps.fetch(stateProps.credentials)
})

export default connect(mapStateToProps, mapActionsToProps, mergeProps)(ListPage)
