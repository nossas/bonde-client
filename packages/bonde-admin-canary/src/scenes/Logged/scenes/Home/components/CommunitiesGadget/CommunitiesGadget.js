import React, { Fragment } from 'react'
import {
  Text,
  Button,
  Flexbox,
  Spacing
} from 'bonde-styleguide'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import allUserCommunities from './query.graphql'
import { authSession } from 'services/auth'
import { toSnakeCase } from '../../utils'
import userCommunitiesQuery from './query'
import { IconBot, IconPage } from '../../../../../../components/PageLogged/Header/MenuCommunity/icons/'

const goToAdmin = (row) => (
  <Button
    light
    flat
    onClick={() => {
      authSession
      .setAsyncItem('community', toSnakeCase(row))
      .then(() => {
        const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
        window.open(baseUrl, '_self')
      })
    }}
  >
    <IconPage size={18} color='black' />
  </Button>
)

const goToCanary = (row) => (
  <Button
    light
    flat
  >
    <Link to={`/admin/${row.id}/chatbot`}>
      <IconBot size={18} color='black' />
    </Link>
  </Button>
)

const RenderText = ({ row }) => (
  <Fragment>
    <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
      {row.name}
    </Text>
    <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
      {row.description || row.city}
    </Text>
  </Fragment>
)

RenderText.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string
  })
}

const columns = [
  {
    field: 'image',
    render: ImageColumn,
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: RenderText
  }
]

const CommunitiesGadget = ({ t, loading, communities }) => (
  <TableCardGadget
    loading={loading}
    data={communities}
    columns={columns}
    title={t('gadgets.communities.title')}
    emptyIcon='community'
    emptyText={t('gadgets.communities.emptyText')}
  />
)

CommunitiesGadget.propTypes = {
  t: PropTypes.func,
  communities: PropTypes.any,
  loading: PropTypes.func
}

const CommunitiesGadgetQueryset = ({ t }) => (
  <Queryset
    query={allUserCommunities}
    filter={{ orderBy: 'UPDATED_AT_DESC' }}
  >
    {({ loading, data, filter }) => (
      <CommunitiesGadget
        t={t}
        loading={loading}
        filter={filter}
        communities={data && data.allUserCommunities ? data.allUserCommunities.nodes : []}
      />
    )}
  </Queryset>
)

CommunitiesGadgetQueryset.propTypes = {
  t: PropTypes.func
}

export default CommunitiesGadgetQueryset
