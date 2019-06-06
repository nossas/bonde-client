//
// @route /mobilizations/:mobilization_id/templates/choose/custom
//
import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import { injectIntl } from 'react-intl'

import * as SelectableActions from 'components/selectable-list/actions'
import MobSelectors from 'mobrender/redux/selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import * as TemplateSelectors from 'mobilizations/templates/selectors'
import * as CommunitySelectors from 'community/selectors'

import { setFilterableSearchBarList } from 'components/filterable-search-bar/actions'

import Page from './page'

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  mobilization: MobSelectors(state, props).getMobilization(),
  selectedIndex: TemplateSelectors.getSelectableIndex(state),
  filterableTemplates: TemplateSelectors.getFilterableTemplates(state)
})

const mapActionsToProps = {
  setFilterableSearchBarList,
  setSelectedIndex: SelectableActions.setSelectedIndex,
  createMobilizationFromTemplate: MobActions.asyncUpdateMobilization
}

const GraphPage = graphql(gql`
  query customTemplates($communityId: Int!) {
    customTemplates (ctxCommunityId: $communityId) {
      nodes {
        id
        name
        goal
        image: facebookShareImage
        createdAt
      }
    }
  }
`, {
  options: ({ communityId }) => ({
    variables: { communityId },
    fetchPolicy: 'network-only'
  }),
  props: ({ ownProps, data: { loading, customTemplates } }) => ({
    loading,
    templates: customTemplates ? customTemplates.nodes : []
  })
})(injectIntl(Page))

export default connect(mapStateToProps, mapActionsToProps)(GraphPage)
