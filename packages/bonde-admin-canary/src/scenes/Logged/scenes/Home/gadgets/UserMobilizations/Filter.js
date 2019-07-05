import React from 'react'
import { I18n } from 'react-i18next'
import { SelectDropdown } from 'components'
import PropTypes from 'prop-types'

const Filter = ({ filter, onChange }) => (
  <I18n ns='home'>
    {(t) => (
      <SelectDropdown
        initialValue={filter.sort}
        onChange={({ value }) => onChange({ sort: value })}
        options={[
          {
            label: t('gadgets.filters.recent'),
            value: 'updated_at_desc'
          },
          {
            label: t('gadgets.filters.alphabetic'),
            value: 'name_asc'
          }
        ]}
      />
    )}
  </I18n>
)

Filter.propTypes = {
  filter: PropTypes.shape({
    sort: PropTypes.string
  }),
  onChange: PropTypes.func
}

export default Filter
