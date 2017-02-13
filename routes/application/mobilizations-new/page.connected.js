import { reduxForm } from 'redux-form'

import * as CommunitySelectors from '~community/selectors'
import { fields, validate } from '~mobilizations/components/mobilization-basics-form'
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'

import MobilizationsNewPage from './page'

const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state) || {}
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
  submit: MobilizationActions.asyncAdd
}

export default reduxForm(
  { form: 'newMobilizationForm', fields, validate },
  mapStateToProps,
  mapActionCreatorsToProps
)(MobilizationsNewPage)
