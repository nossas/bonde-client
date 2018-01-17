import React from 'react'
import { graphql, gql } from 'react-apollo'
import { Loading } from '~client/components/await'

const detailActivistQuery = gql`
  query detailActivist ($communityId: Int!, $activistId: Int!) {
    allActivistMobilizations (
      condition: {
        communityId: $communityId,
        activistId: $activistId
      }
    ) {
      nodes {
        id,
        name
      }
    }
    allActivistTags (
      condition: {
        communityId: $communityId,
        activistId: $activistId
      } 
    ) {
      nodes {
        tagCompleteName,
        tagFrom,
        tagName
      }
    }
  }
`

export default (WrappedComponent) => {
  class PP extends React.Component {
    render () {
      const {
        data: {
          loading,
          allActivistMobilizations,
          allActivistTags
        },
        ...ownProps
      } = this.props

      const mobilizations = allActivistMobilizations
        ? allActivistMobilizations.nodes
        : []

      const tags = allActivistTags
        ? allActivistTags.nodes
        : []

      return loading ? <Loading /> : (
        <WrappedComponent
          {...ownProps}
          mobilizations={mobilizations}
          tags={tags}
        />
      )
    }
  }

  return graphql(detailActivistQuery, {
    options: ({ communityId, activistId }) => ({
      variables: {
        communityId,
        activistId
      }
    })
  })(PP)
}
