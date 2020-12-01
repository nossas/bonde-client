import { gql } from "bonde-core-tools";

export default gql`
  mutation CreateMatch(
    $input: CreateMatchInput!
  ) {
    create_match (input: $input) {
      individuals_ticket_id
      volunteers_ticket_id
      individuals_user_id
      volunteers_user_id
      status
    }
  }
`;
