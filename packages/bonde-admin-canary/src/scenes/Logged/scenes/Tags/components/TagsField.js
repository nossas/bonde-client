import React from 'react'
import { Loading, MultipleChoiceField, Tag } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import TAGS from './tags.graphql'


const TagsField = (props) => (
  <Query query={TAGS} variables={{ tagType: 'user' }}>
    {({ loading, error, data }) => {

      if (loading) return <Loading />

      if (error) console.log('error', error)
      
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

export default TagsField
