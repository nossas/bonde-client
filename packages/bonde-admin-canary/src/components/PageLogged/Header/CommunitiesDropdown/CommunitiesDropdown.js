import React from 'react'
import PropTypes from 'prop-types'
import urljoin from 'url-join'
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
          <div>{myCommunity}</div>
        )
      }}
    </Query>
  )
}

const ShowCommunityWithRouter = withRouter(ShowCommunity)

const CommunitiesDropdown = ({ loading, communities, path }) => (
  <Dropdown
    loading={loading}
    label={<ShowCommunityWithRouter />}
    disabled={!(communities.length > 0)}
  >
    {communities.map(c => {
      return (
        <DropdownItem
          key={`communities-dropdown-${c.i}`}
          to={path && urljoin(path, c.id.toString())}
          component={Link}
        >
          {c.name}
        </DropdownItem>
      )
    })}
  </Dropdown>
)

ShowCommunity.propTypes = {
  match: PropTypes.object
}

CommunitiesDropdown.defaultProps = {
  communities: []
}

CommunitiesDropdown.propTypes = {
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  loading: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default CommunitiesDropdown
