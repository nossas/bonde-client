import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'

import { Loading } from '~components/await'
import * as paths from '~community/paths'
import { ListItem } from '~community/components'

class CommunityListPage extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoaded && nextProps.communities.length === 0) {
      browserHistory.push(paths.add())
    }
  }

  onClickItem (id) {
    this.props.select(id)
    browserHistory.push('/')
  }

  render () {
    const { isLoading, isLoaded, communities, user } = this.props

    return isLoading ? <Loading /> : (
      <div>
        <h1>Olá {user.first_name},</h1>
        <h2>Escolha uma das suas comunidades</h2>
        {isLoaded ? (
          <div className='rounded bg-white'>
            {communities && communities.map((community, key) => (
              <ListItem
                key={`list-item-${key}`}
                community={community}
                onClick={this.onClickItem.bind(this)}
              />
            ))}
          </div>
        ) : null}
        <p className='white center'>
          ou <Link to={paths.add()}>Crie uma nova comunidade</Link>
        </p>
      </div>
    )
  }
}

CommunityListPage.propTypes = {
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  communities: PropTypes.array,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired
  }).isRequired,
  // Actions
  select: PropTypes.func.isRequired
}

export default CommunityListPage
