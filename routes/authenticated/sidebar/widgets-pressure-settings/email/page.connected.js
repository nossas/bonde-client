import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      ...props.widget.settings || {},
      targets: props.widget.settings && props.widget.settings.targets
    }
  }
}

const validate = values => {
  const errors = {}
  if (!values.pressure_subject) {
    errors.pressure_subject = 'Preenchimento obrigatório'
  }
  if (!values.pressure_body) {
    errors.pressure_body = 'Preenchimento obrigatório'
  }
  return errors
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'widgetsPressureSettingsEmailForm',
    fields: ['pressure_subject', 'pressure_body', 'targets'],
    validate
  })(Page)
)
