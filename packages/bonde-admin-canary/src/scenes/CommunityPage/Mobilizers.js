import React, { useState } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Loading, Header } from 'bonde-components'
import { useQuery } from 'bonde-core-tools'
import UsersTable from './UsersTable'
import InvitationsTable from './InvitationsTable'
import InviteForm from './InviteForm'

const InvitationsQuery = gql`
  query InvitationsByCommunity($communityId: Int!) {
    invitations_aggregate(
      where: { community_id: { _eq: $communityId }, expired: { _is_null: true } },
      order_by: { created_at: desc_nulls_last }
    ) {
      nodes {
        user {
          first_name
          email
        }
        created_at
        role
        email
        expired
        expires
      }
      aggregate {
        count
      }
    }

    community_users_aggregate(where: { community_id: { _eq: $communityId } }) {
      nodes {
        id
        user {
          avatar
          first_name
          last_name
          email
        }
        role
      }
      aggregate {
        count
      }
    }
  }
`

const Styles = styled.div`
  ${Header.h3} {
    margin-bottom: 20px;
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;

  ${Header.h5} {
    margin: 0 20px 15px 0;
    padding: 0 0 1px 0;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
  }

  ${Header.h5}.active {
    border-bottom: 2px solid #ee0099;
  }
`

const FetchInvitations = ({ community }) => {
  const variables = { communityId: community.id }
  const { data, loading, error, refetch } = useQuery(InvitationsQuery, { variables })
  const [menu, setMenu] = useState(1)

  if (loading) return <Loading />
  if (error) return <div>Error</div>

  const {
    invitations_aggregate: {
      nodes: invitations,
      aggregate: {
        count: invitationsCount
      }
    },
    community_users_aggregate: {
      nodes: communityUsers,
      aggregate: {
        count: communityUsersCount
      }
    }
  } = data

  return (
    <Styles>
      <Header.h3>Convide um mobilizador</Header.h3>
      <InviteForm onSuccess={() => refetch(variables)} />
      <Flex>
        <Header.h5 className={menu === 1 ? 'active' : ''} onClick={() => setMenu(1)}>
          {`Mobilizadores (${communityUsersCount})`}
        </Header.h5>
        <Header.h5 className={menu === 2 ? 'active' : ''} onClick={() => setMenu(2)}>
          {`Convites (${invitationsCount})`}
        </Header.h5>
      </Flex>
      {menu === 1 && <UsersTable data={communityUsers} refetch={() => refetch(variables)} />}
      {menu === 2 && <InvitationsTable data={invitations} />}
    </Styles>
  )
}

FetchInvitations.propTypes = {
  community: PropTypes.object.isRequired
}

export default FetchInvitations
