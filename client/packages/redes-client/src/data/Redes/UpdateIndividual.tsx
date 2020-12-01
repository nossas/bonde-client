import { gql } from "bonde-core-tools";
import { REDE_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";

export default gql`
  mutation updateIndividual(
    $id: Int!
    $individual: rede_individuals_set_input!
  ) {
    update_rede_individuals(_set: $individual, where: { id: { _eq: $id } }) {
      returning {
        ...individual
      }
    }
  }
  ${REDE_INDIVIDUAL}
`;
