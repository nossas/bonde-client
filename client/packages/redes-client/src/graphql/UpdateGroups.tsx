import { gql } from "bonde-core-tools";

export default gql`
  mutation updateRedeGroup(
    $redeGroupId: Int_comparison_exp!
    $updatedSettings: jsonb!
  ) {
    update_rede_groups(
      where: { id: $redeGroupId }
      _append: { settings: $updatedSettings }
    ) {
      returning {
        id
        settings
        name
      }
    }
  }
`;
