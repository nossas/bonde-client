import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Page from './page'

const fields = ['call_to_action', 'button_text', 'count_text']

const mapStateToProps = (state, props) => {
  return {
    initialValues: props.widget.settings || {}
  }
}

export default connect(mapStateToProps)(
  reduxForm({ form: 'widgetsFormSettingsPageForm', fields })(Page)
)
