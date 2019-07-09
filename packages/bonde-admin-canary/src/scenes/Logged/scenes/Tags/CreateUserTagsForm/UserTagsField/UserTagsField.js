import React from 'react'
import { MultipleChoiceField, Tag } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import { LoadingFullScreen } from 'components/Loadable'
import UserTags from './userTags.graphql'
import PropTypes from 'prop-types'

const UserTagsField = ({ t, ...props }) => (
  <Query query={UserTags}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <LoadingFullScreen message={t('loading.userTags')} />
        )
      }

      const tags = data.allTags.nodes.map(({ name, label }) => ({
        label,
        value: name
      }))

      return (
        <MultipleChoiceField
          options={tags}
          inputComponent={Tag}
          {...props}
        />
      )
    }}
  </Query>
)

UserTagsField.propTypes = {
  t: PropTypes.func
}

export default UserTagsField
