import React from 'react'
import PropTypes from 'prop-types'
import urljoin from 'url-join'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

const CommunitiesDropdown = ({ t, communities, path }) => {
  return (
    <Dropdown
      label={t('dropdown.label.communities')}
      disabled={!(communities.length > 0)}
    >
      {communities.map(c => (
        <DropdownItem
          key={`communities-dropdown-${c.i}`}
          to={path && urljoin(path, c.id.toString())}
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
  path: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  t: PropTypes.func
}

export default CommunitiesDropdown
