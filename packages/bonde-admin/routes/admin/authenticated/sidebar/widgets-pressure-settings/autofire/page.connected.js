//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fields, validate } from '~client/mobilizations/widgets/components/form-autofire'
import { injectIntl } from 'react-intl'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = state => {
  const selectors = MobSelectors(state)
  const widget = selectors.getWidget()

  return {
    initialValues: widget.settings || {},
    mobilization: selectors.getMobilization(),
    widget
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(reduxForm({
    form: 'formAutofireForm',
    fields,
    validate
  })(Page)
))
