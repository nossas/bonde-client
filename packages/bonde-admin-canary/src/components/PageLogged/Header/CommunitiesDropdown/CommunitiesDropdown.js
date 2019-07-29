import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import userCommunitiesQuery from './query'
import { withRouter } from 'react-router'

const ShowCommunity = ({ match }) => {
  return (
    <Query query={userCommunitiesQuery}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error!'

        const myCommunity = data.userCommunities.edges.map(i => {
          let myCommunityName
          if (i.node.id === match.params.id) {
            myCommunityName = i.node.name
            return myCommunityName
          }
          return myCommunityName
        })

        // TODO: add image community
        return (
          <div>
            {myCommunity}
          </div>
        )
      }}
    </Query>
  )
}

const ShowCommunityWithRouter = withRouter(ShowCommunity)

const CommunitiesDropdown = ({ t, communities, path }) => {
  return (
    <Dropdown
      label={t('dropdown.label.communities')}
      disabled={!(communities.length > 0)}
    >
      {communities.map(c => (
        <DropdownItem
          to={`/admin/${c.id}/chatbot`}
          component={Link}
        >
          {c.name}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}

CommunitiesDropdown.defaultProps = {
  communities: []
}

CommunitiesDropdown.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  t: PropTypes.func
}

export default ({ t , props }) => (
  <Query query={userCommunitiesQuery}>
    {({ data, loading, error }) => {
      if (loading) return 'Loading...'
      if (error) return 'Error!'

      return (
        <CommunitiesDropdown
          t={t}
          loading={loading}
          communities={data && data.userCommunities ? data.userCommunities.edges.map(i => i.node) : []}
          {...props}
        />
      )
    }}
  </Query>
)
