import React from 'react'
import { I18n } from 'react-i18next'
import { Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import { Gadget, SelectDropdown } from 'components'
import PropTypes from 'prop-types'

const Filter = ({ filter, onChange }) => (
  <I18n ns='home'>
    {(t) => (
      <Flexbox>
        <Spacing margin={{ right: 8 }}>
          <Gadget.Title>
            {t('gadgets.trendingMobilizations.filtersAdornment')}
          </Gadget.Title>
        </Spacing>
        <SelectDropdown
          initialValue={filter.days}
          onChange={({ value }) => onChange({ days: value })}
          options={[
            {
              label: t('gadgets.trendingMobilizations.filters.now'),
              value: 2
            },
            {
              label: t('gadgets.trendingMobilizations.filters.inspire'),
              value: 90
            }
          ]}
        />
      </Flexbox>
    )}
  </I18n>
)

Filter.propTypes = {
  filter: PropTypes.shape({
    sort: PropTypes.string,
    days: PropTypes.any
  }),
  onChange: PropTypes.func
}

export default Filter
