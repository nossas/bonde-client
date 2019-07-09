import React from 'react'
import { I18n } from 'react-i18next'
import { Icon, Text, Spacing, Flexbox2 as Flexbox } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const StatusColumn = ({ value }) => (
  <I18n ns='home'>
    {(t) => {
      const statuses = {
        ACTIVE: {
          label: t('gadgets.mobilizations.statuses.active'),
          props: { color: '#50e3c2', fontWeight: 'bold' }
        },
        ARCHIVED: {
          label: t('gadgets.mobilizations.statuses.archived'),
          props: { color: '#aaaaaa', fontWeight: 'normal' }
        }
      }

      return (
        <Text
          fontSize={13}
          lineHeight={1.54}
          {...statuses[value].props}
        >
          <Flexbox>
            {value === 'ACTIVE' && (
              <Spacing margin={{ right: 4 }}>
                <Icon name='tick' color='#50e3c2' />
              </Spacing>
            )}
            {statuses[value].label}
          </Flexbox>
        </Text>
      )
    }}
  </I18n>
)

StatusColumn.propTypes = {
  value: PropTypes.string
}

export default StatusColumn
