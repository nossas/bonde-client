import { gql } from "bonde-core-tools"

const UpdateWidgetSettings = gql`
  mutation updateWidgetSettings($settings: jsonb!, $id: Int_comparison_exp!) {
    update_widgets(_append: {settings: $settings}, where: {id: $id}) {
      returning {
        settings
        id
      }
    }
  }
`

export default UpdateWidgetSettings