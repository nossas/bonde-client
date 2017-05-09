import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { fields, validate } from '~client/mobilizations/widgets/components/form-autofire'
import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    initialValues: props.widget.settings || {}
  }
}

export default connect(mapStateToProps)(
  reduxForm({ form: 'formAutofireForm', fields, validate })(Page)
)
