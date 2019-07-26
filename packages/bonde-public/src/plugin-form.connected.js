import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormPlugin } from 'bonde-webpage/lib/plugins/form'
import { asyncFormEntryCreate } from 'bonde-webpage/lib/redux/action-creators'
import { selectors as MobSelectors } from 'bonde-webpage/lib/redux'

const mapDispatchToProps = { asyncFormEntryCreate }

const mapStateToProps = state => MobSelectors(state).getMobilizationLink()

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FormPlugin))