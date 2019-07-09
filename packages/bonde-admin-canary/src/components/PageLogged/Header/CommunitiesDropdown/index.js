import React from 'react'
import { I18n } from 'react-i18next'
import { Queryset } from 'components'
import allUserCommunities from './query.graphql'
import CommunitiesDropdown from './CommunitiesDropdown'
import PropTypes from 'prop-types'

const CommunitiesDropdownQueryset = ({ path }) => (
  <Queryset
    query={allUserCommunities}
    filter={{ orderBy: 'NAME_ASC' }}
  >
    {({ loading, data, filter, onChangeFilter }) => (
      <I18n ns='header'>
        {t => (
          <CommunitiesDropdown
            t={t}
            path={path}
            loading={loading}
            filter={filter}
            onChangeFilter={onChangeFilter}
            communities={data && data.query ? data.query.nodes : []}
          />
        )}
      </I18n>
    )}
  </Queryset>
)

CommunitiesDropdownQueryset.propTypes = {
  path: PropTypes.string
}

export default CommunitiesDropdownQueryset
