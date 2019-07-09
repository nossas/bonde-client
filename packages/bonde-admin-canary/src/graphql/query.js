/* eslint-disable react/display-name */
import React from 'react'
import { Query } from 'react-apollo'

const QueryHOC = ({ loading: Loading, query, props, variables }) => (Component) => (ownProps) => (
  <Query query={query} variables={variables}>
    {({ loading, data }) => {
      if (loading && Loading) return <Loading />

      return typeof props === 'function'
        ? <Component {...props({ loading, data })} {...ownProps} />
        : <Component loading={loading} data={data} {...ownProps} />
    }}
  </Query>
)

export default QueryHOC
