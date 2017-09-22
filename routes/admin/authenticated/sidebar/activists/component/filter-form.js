import React from 'react'
import { gql, withApollo } from 'react-apollo'
//import Select from 'react-select'
import Select from 'react-select-plus'

const tagsByCommunityQuery = gql`
  query tagsByCommunityQuery ($communityId: Int!, $search: String) {
    filterCommunityTags (
        ctxCommunityId: $communityId,
        search: $search
    ) {
      nodes {
        tagCompleteName,
        tagName,
        tagFrom
      }
    }
  }
`

const groupBy = (array , f) => {
  let groups = {}
  array.forEach((o) => {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push( o );
  })

  return Object.keys(groups).map((group) => {
    return groups[group]
  })
}


const tagGroupNames = (tagFrom) => {
  switch(tagFrom) {
    case 'donation':
      return 'Doações'
    case 'pressure':
      return 'Pressões'
    case 'form':
      return 'Formulários genéricos'
    default:
      return 'Outras etiquetas'
  }
}

const FilterForm = ({
  name,
  query,
  placeholder,
  onChange,
  communityId,
  client,
  className
}) => {
  const getOptions = (input) => {
    return client.query({
      query: tagsByCommunityQuery,
      variables: {
        communityId,
        search: input
      }
    })
    .then(({ data: { filterCommunityTags } }) => {
      const grouped = groupBy(filterCommunityTags.nodes, item => [item.tagFrom])
      const options = grouped.map((group) => ({
          label: tagGroupNames(group[0].tagFrom),
          options: group.map(tag => ({
            label: tag.tagName,
            value: tag.tagCompleteName
          }))
      }))
      return { options }
    })
    .catch((error) => {
      // TODO
      console.log(error)
    })
  }

  return (
    <Select.Async
      name={name}
      placeholder={placeholder}
      value={query}
      loadOptions={getOptions}
      className={className}
      onChange={({ value }) => onChange(value)}
    />
  )
}

export default withApollo(FilterForm)
