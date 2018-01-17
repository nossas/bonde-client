//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/donation
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { adjustmentsForm, AdjustmentsSettingsForm } from '~client/mobrender/widgets/adjustments'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'

const mapStateToProps = state => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(adjustmentsForm(AdjustmentsSettingsForm))
)
