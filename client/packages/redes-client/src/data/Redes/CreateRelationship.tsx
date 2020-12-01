import { gql } from "bonde-core-tools";

export default gql`
  mutation createRelationship(
  $input: [rede_relationships_insert_input!]!
  $volunteerId: Int!
  $recipientId: Int!
  ) {
  insert_rede_relationships(
    objects: $input
  ) {
    returning {
      created_at
      id
      recipient_id
      updated_at
      agent {
        id
      }
    }
  }

  update_rede_individuals(
    _set: { availability: "indisponível" }
    where: {
      _or: [{ id: { _eq: $volunteerId } }, { id: { _eq: $recipientId } }]
    }
  ) {
    returning {
      id
      email
      availability
    }
  }
  }
`;
