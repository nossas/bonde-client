import { gql } from "bonde-core-tools";

export default gql`
  mutation updateRelationship(
    $id: Int!
    $relationship: rede_relationships_set_input!
  ) {
    update_rede_relationships(
      _set: $relationship
      where: { id: { _eq: $id } }
    ) {
      returning {
        ...relationship
      }
    }
  }

  fragment relationship on rede_relationships {
    volunteer {
      first_name
      id
    }
    recipient {
      first_name
      id
    }
    created_at
    status
    updated_at
    agent {
      first_name
      id
    }
  }
`;
