import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Page from './page'

const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      show_counter: 'false',
      show_city: 'city-false',
      count_text: 'pressões feitas',
      main_color: '#f23392',
      ...props.widget.settings || {}
    }
  }
}

const fields = [
  'title_text', 'button_text', 'show_counter', 'show_city', 'count_text', 'main_color'
]

const validate = values => {
  const errors = {}
  if (!values.title_text || values.title_text === '') {
    errors.title_text = 'Insira um título para o formulário'
  }
  if (!values.button_text) {
    errors.button_text = 'Insira um texto para o botão'
  }
  return errors
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'widgetsPressureSettingsForm',
    fields,
    validate
  })(Page)
)
