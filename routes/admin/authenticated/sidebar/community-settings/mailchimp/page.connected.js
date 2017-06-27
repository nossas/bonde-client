import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

import Page from './page'

const mapStateToProps = state => ({
  initialValues: { ...CommunitySelectors.getCurrent(state) }
})

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(reduxForm({
    form: 'mailchimpForm',
    fields: ['id', 'mailchimp_api_key', 'mailchimp_list_id']
  })(Page))
)
