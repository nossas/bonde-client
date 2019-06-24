import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BondeBackground } from 'components/layout/background'
import * as paths from 'paths'
import { FormattedMessage } from 'react-intl'
import { Loading } from 'components/await'
import { ListItem } from 'community/components'
import crossStorage from 'cross-storage-client'

class CommunityListPage extends Component {
  componentDidMount () {
    this.props.asyncFetch()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoaded && nextProps.communities.length === 0) {
      this.props.history.push(paths.communityAdd())
    }
  }

  onClickItem (community) {
    crossStorage
      .onConnect()
      .then(() => {
        return crossStorage
          .set('community', JSON.stringify(community))
          .then(() => {
            this.props.select(community.id)
            this.props.history.push(paths.mobilizations())
          })
      })
  }

  render () {
    const { isLoading, isLoaded, communities, user } = this.props

    return isLoading ? <Loading /> : (
      <BondeBackground
        contentSize={3}
        alignment={{ x: 'center', y: 'top' }}
      >
        <div className='col-12'>
          <h1>
            <FormattedMessage
              id='page--community-list.title'
              defaultMessage='Olá {name},'
              values={{ name: user.firstName || user.first_name }}
            />
          </h1>
          <h2>
            <FormattedMessage
              id='page--community-list.subtitle'
              defaultMessage='Escolha uma das suas comunidades'
            />
          </h2>
          {isLoaded ? (
            <div className='rounded bg-white'>
              {communities && communities.map((community, key) => (
                <ListItem
                  key={`list-item-${key}`}
                  community={community}
                  onClick={() => this.onClickItem(community)}
                />
              ))}
            </div>
          ) : null}
          <p className='white center'>
            <FormattedMessage
              id='page--community-list.or'
              defaultMessage='or {link}'
              values={{
                link: (
                  <Link to={paths.communityAdd()}>
                    <FormattedMessage
                      id='page--community-list.new'
                      defaultMessage='Crie uma nova comunidade'
                    />
                  </Link>
                )
              }}
            />
          </p>
        </div>
      </BondeBackground>
    )
  }
}

CommunityListPage.propTypes = {
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  communities: PropTypes.array,
  user: PropTypes.object.isRequired,
  // Actions
  select: PropTypes.func.isRequired
}

export default CommunityListPage
