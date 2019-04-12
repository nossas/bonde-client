import React from 'react'
import { Text } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import Filter from './Filter'
import { authSession } from 'services/auth'
import { toSnakeCase } from '../../utils'
import userCommunitiesQuery from './query'

const columns = [
  {
    field: 'image',
    render: ImageColumn,
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: ({ row }) => (
      <React.Fragment>
        <Text
          fontSize={16}
          fontWeight={900}
          lineHeight={1.25}
        >
          {row.name}
        </Text>
        <Text
          fontSize={13}
          lineHeight={1.54}
          color='#4a4a4a'
        >
          {row.description || row.city}
        </Text>
      </React.Fragment>
    )
  },
]

const CommunitiesGadget = ({ t, loading, communities, filter, onChangeFilter }) => (
  <TableCardGadget
    loading={loading}
    data={communities}
    columns={columns}
    title={t('gadgets.communities.title')}
    emptyIcon='community'
    emptyText={t('gadgets.communities.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    onClickRow={(row) => {
      authSession
        .setAsyncItem('community', toSnakeCase(row))
        .then(() => {
          const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
          window.open(baseUrl, '_self')
        })
    }}
  />
)

/*const CommunitiesGadgetQueryset = ({ t }) => (
  <Queryset
    query={HomeAPI.query.userCommunities}
    filter={{ sort: 'updated_at_desc' }}
  >
    {({ loading, data, filter, onChangeFilter }) => {
      if (loading) return 'Loading...'
      return (
        <CommunitiesGadget
          t={t}
          loading={loading}
          filter={filter}
          onChangeFilter={onChangeFilter}
          communities={data && data.userCommunities ? data.userCommunities.edges.map(i => i.node) : []}
        />
      )
    }}
  </Queryset>
)*/

/*export default CommunitiesGadgetQueryset*/
export default ({ t }) => (
  <Query query={userCommunitiesQuery}>
  {({ data, loading, error }) => {
    if (loading) return 'Loading...'
    if (error) return 'Error!'

    return (
      <CommunitiesGadget
        t={t}
        loading={loading}
        filter={{sort: 'updated_at_desc'}}
        communities={data && data.userCommunities ? data.userCommunities.edges.map(i => i.node) : []}
      />
    )
  }}
  </Query>
)
