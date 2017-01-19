import * as MobilizationSelectors from '../../selectors'
import { asyncUpdate } from '../../action-creators'

export const mapStateToProps = state => {
  const mobilization = MobilizationSelectors.getCurrent(state)
  return {
    initialValues: mobilization,
    mobilization
  }
}

export const mapActionCreatorsToProps = {
  submit: asyncUpdate
}
