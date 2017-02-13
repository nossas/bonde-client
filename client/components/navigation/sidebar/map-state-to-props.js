import * as AccountSelectors from '~account/selectors'
import * as CommunitySelectors from '~community/selectors'
import * as MobilizationSelectors from '~mobilizations/selectors'

export default (state, ownProps) => ({
  loading: MobilizationSelectors.isLoading(state),
  user: AccountSelectors.getUser(state),
  mobilization: MobilizationSelectors.getCurrent(state),
  community: CommunitySelectors.getCurrent(state)
})
