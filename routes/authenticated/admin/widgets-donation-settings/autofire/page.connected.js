import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fields, validate } from '~mobilizations/widgets/components/form-autofire'

import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    initialValues: props.widget.settings || {}
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'donationAutofireForm',
    fields,
    validate
  })(Page)
)
