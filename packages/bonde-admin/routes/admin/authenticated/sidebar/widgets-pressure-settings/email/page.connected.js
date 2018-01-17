//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { addNotification as notify } from 'reapop'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { messagePressureTargetsRemoveAll } from '~client/utils/notifications'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state)
  const widget = selectors.getWidget()

  return {
    initialValues: {
      show_city: 'city-false',
      ...widget.settings || {},
      targets: widget.settings && widget.settings.targets
    },
    mobilization: selectors.getMobilization(),
    widget
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  notifyAllTargetsRemoval: () => dispatch(notify(messagePressureTargetsRemoveAll(props.intl))),
  asyncWidgetUpdate: (...args) => dispatch(MobActions.asyncUpdateWidget(...args))
})

const validate = (values, { intl }) => {
  const errors = {}
  const requiredMessage = intl.formatMessage({
    id: 'page--pressure-widget-email.form.validation.required',
    defaultMessage: 'Preenchimento obrigatório'
  })

  if (!values.pressure_subject) {
    errors.pressure_subject = requiredMessage
  }
  if (!values.pressure_body) {
    errors.pressure_body = requiredMessage
  }
  return errors
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'widgetsPressureSettingsEmailForm',
    fields: [
      'pressure_subject',
      'pressure_body',
      'targets',
      'disable_edit_field',
      'show_city'
    ],
    validate
  })(Page)
))
