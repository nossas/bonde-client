import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import * as CommunitySelectors from '~client/community/selectors'
import { fields, validate } from '~client/mobilizations/components/mobilization-basics-form'
import MobSelectors from '~client/mobrender/redux/selectors'
import { asyncAddMobilization } from '~client/mobrender/redux/action-creators'

import Page from './page'

const form = 'newMobilizationForm'

const mapStateToProps = (state, props) => {
  const mobilization = MobSelectors(state, props).getMobilization() || {}
  const community = CommunitySelectors.getCurrent(state)
  return {
    mobilization,
    formName: form,
    initialValues: {
      ...mobilization,
      community_id: mobilization.community_id || community.id
    }
  }
}

const mapActionCreatorsToProps = {
  submit: asyncAddMobilization
}

export default injectIntl(reduxForm(
  { form, fields, validate },
  mapStateToProps,
  mapActionCreatorsToProps
)(Page))
