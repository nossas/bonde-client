import React, { useState } from 'react'
import { Text, Pagination } from 'bonde-styleguide'
import { Query } from 'react-apollo'
/* import { Queryset } from 'components' */
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
/* import HomeAPI from '../../graphql' */
import Filter from './Filter'
import { authSession } from 'services/auth'
import { toSnakeCase } from '../../utils'
import userMobilizationsQuery from './query'
import PropTypes from 'prop-types'

const Name = ({ value }) => (
  <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
    {value}
  </Text>
)

Name.propTypes = {
  value: PropTypes.any
}

const Community = ({ value }) => (
  <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
    {value.name}
  </Text>
)

Community.propTypes = {
  value: PropTypes.any
}

const Score = ({ value }) => (
  <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
    {value || '–'}
  </Text>
)

Score.propTypes = {
  value: PropTypes.any
}

const columns = [
  { field: 'image', render: ImageColumn, props: { width: '40px' } },
  {
    field: 'name',
    render: Name
  },
  {
    field: 'community',
    render: Community
  },
  {
    field: 'score',
    render: Score
  }
]

const MobilizationList = ({
  t,
  loading,
  mobilizations,
  filter,
  onChangeFilter,
  page,
  onChangePage
}) => (
  <TableCardGadget
    border
    loading={loading}
    data={mobilizations}
    columns={columns}
    title={t('gadgets.mobilizations.title')}
    emptyIcon='mobilization'
    emptyText={t('gadgets.mobilizations.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    pageIndex={page.index}
    pageTotal={page.total}
    onClickRow={row => {
      authSession
        .setAsyncItem('community', toSnakeCase(row.community))
        .then(() => {
          const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
          window.open(`${baseUrl}/mobilizations/${row.id}/edit`, '_self')
        })
    }}
    renderPagination={() => (
      <Pagination
        pageIndex={page.index}
        pages={page.total}
        onChangePage={onChangePage}
        textPrev={t('pagination.previous')}
        textNext={t('pagination.next')}
      />
    )}
  />
)

MobilizationList.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.any,
  mobilizations: PropTypes.any,
  filter: PropTypes.shape({
    sort: PropTypes.string
  }),
  onChangeFilter: PropTypes.func,
  page: PropTypes.shape({
    index: PropTypes.number,
    total: PropTypes.number
  }),
  onChangePage: PropTypes.func
}

const MobilizationsGadjet = ({ t }) => {
  const [orderBy, setOrderBy] = useState('updated_at_desc')
  const [pagination, setPagination] = useState({ page: 1, size: 2 })

  const variables = { sort: orderBy, first: pagination.size * pagination.page, last: pagination.size }
  return (
    <Query query={userMobilizationsQuery} variables={variables} fetchPolicy="cache-and-network">
      {({ data, error, fetchMore, loading, refetch }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error!!'

        const pageTotal = data ? (data.userMobilizations.totalCount / pagination.size) : 0

        const onChangeFilter = ({ sort }) => {
          refetch({ sort })
          setOrderBy(sort)
        }

        const onChangePage = (index) => {
          const first = index > 0 ? index * pagination.size : pagination.size
          const variables = { first }
          const updateQuery = (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev
            return Object.assign({}, prev, { data: fetchMoreResult })
          }

          fetchMore({ variables, updateQuery })
          setPagination({ ...pagination, page: index + 1 })
        }

        return (
          <MobilizationList
            t={t}
            filter={{ sort: orderBy }}
            onChangeFilter={onChangeFilter}
            page={{ index: pagination.page - 1, total: pageTotal }}
            onChangePage={onChangePage}
            loading={loading}
            mobilizations={data && data.userMobilizations ? data.userMobilizations.edges.map(i => i.node) : []}
          />
        )
      }}
    </Query>
  )
}

MobilizationsGadjet.propTypes = {
  t: PropTypes.func
}

export default MobilizationsGadjet
