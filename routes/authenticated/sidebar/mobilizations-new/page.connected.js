import { reduxForm } from 'redux-form'

import * as CommunitySelectors from '~community/selectors'
import { fields, validate } from '~mobilizations/components/mobilization-basics-form'
import MobSelectors from '~client/mobrender/redux/selectors'
import { asyncAddMobilization } from '~client/mobrender/redux/action-creators'

import Page from './page'

const mapStateToProps = (state, props) => {
  const mobilization = MobSelectors(state, props).getMobilization() || {}
  const community = CommunitySelectors.getCurrent(state)
  return {
    mobilization,
    initialValues: {
      ...mobilization,
      community_id: mobilization.community_id || community.id
    }
  }
}

const mapActionCreatorsToProps = {
  submit: asyncAddMobilization
}

export default reduxForm(
  { form: 'newMobilizationForm', fields, validate },
  mapStateToProps,
  mapActionCreatorsToProps
)(Page)
