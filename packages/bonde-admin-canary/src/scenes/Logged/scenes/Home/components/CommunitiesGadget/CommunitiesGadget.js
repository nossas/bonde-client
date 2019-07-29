import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Flexbox,
  Spacing
} from 'bonde-styleguide'
import { Link } from 'react-router-dom'
import { Queryset } from 'components'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import allUserCommunities from './query.graphql'
import { authSession } from 'services/auth'
import { toSnakeCase } from '../../utils'
import { IconBot, IconPage } from '../../../../../../components/PageLogged/Header/MenuCommunity/icons/'

const goToAdmin = (row) => (
  <Spacing margin={{ left: 12, top: 12 }}>
    <button onClick={() => {
      authSession
        .setAsyncItem('community', toSnakeCase(row))
        .then(() => {
          const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
          window.open(baseUrl, '_self')
        })
    }}
    >
      <IconPage size={18} color='black' />
    </button>
  </Spacing>
)

const goToCanary = (row) => (
  <Spacing margin={{ left: 12, top: 12 }}>
    <Link to={`/admin/${row.id}/chatbot`}>
      <IconBot size={18} color='black' />
    </Link>
  </Spacing>
)

const RenderText = ({ row }) => (
  <Fragment>
    <Flexbox horizontal>
      <div>
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
      </div>
      <Flexbox horizontal>
        {row.id === '73' && (
          goToCanary(row)
        )}

        { goToAdmin(row) }
      </Flexbox>
    </Flexbox>
  </Fragment>
)

RenderText.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number,
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
