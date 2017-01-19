import { selectors as AccountSelectors } from '~account'
import { selectors as CommunitySelectors } from '~community'
import { selectors as MobilizationSelectors } from '~mobilizations'

export default (state, ownProps) => ({
  loading: MobilizationSelectors.isLoading(state),
  user: AccountSelectors.getUser(state),
  mobilization: MobilizationSelectors.getCurrent(state),
  community: CommunitySelectors.getCurrent(state)
})
