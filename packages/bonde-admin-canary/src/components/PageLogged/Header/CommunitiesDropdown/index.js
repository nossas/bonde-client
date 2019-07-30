import React from 'react'
import { I18n } from 'react-i18next'
import { Queryset } from 'components'
import userCommunitiesQuery from './query'
import CommunitiesDropdown from './CommunitiesDropdown'
import PropTypes from 'prop-types'

const CommunitiesDropdownQueryset = ({ path }) => (
  <Queryset
    query={userCommunitiesQuery}
  >
    {({ loading, data }) => (
      <I18n ns='header'>
        {t => (
          <CommunitiesDropdown
            t={t}
            path={path}
            loading={loading}
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
