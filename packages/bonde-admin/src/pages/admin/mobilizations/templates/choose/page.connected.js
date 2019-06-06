//
// @route /mobilizations/:mobilization_id/templates/choose
//
import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import * as CommunitySelectors from 'community/selectors'
import MobSelectors from 'mobrender/redux/selectors'
import { asyncUpdateMobilization } from 'mobrender/redux/action-creators'
import * as TemplateSelectors from 'mobilizations/templates/selectors'
import * as paths from 'paths'
import Page from './page'

const mapStateToProps = (state, props) => ({
  communityId: CommunitySelectors.getCurrentId(state),
  mobilization: MobSelectors(state, props).getMobilization(),
  templatesGlobal: TemplateSelectors.getGlobalTemplates(state),
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

const mapActionsToProps = (dispatch, props) => ({
  createMobilizationFromTemplate: ({ mobilization, template }) => {
    dispatch(asyncUpdateMobilization({
      id: mobilization.id,
      template_mobilization_id: template.id
    }))
    .then(() => {
      props.history.push(paths.editMobilization(mobilization.id))
    })
  },
  createEmptyMobilization: ({ mobilization }) => {
    props.history.push(paths.createBlock(mobilization))
  }
})

const GraphPage = graphql(gql`
  query allTemplates($communityId: Int!) {
    customTemplates (ctxCommunityId: $communityId) {
      totalCount
    }
    globalTemplates {
      nodes {
        id,
        name,
        goal
      }
    }
  }
`, {
  options: ({ communityId }) => ({
    variables: { communityId },
    fetchPolicy: 'network-only'
  }),
  props: ({ ownProps, data: { loading, customTemplates, globalTemplates } }) => {
    return {
      loading,
      customTemplatesLength: customTemplates ? customTemplates.totalCount : 0,
      globalTemplates: globalTemplates ? globalTemplates.nodes : []
    }
  }
})(Page)

export default connect(mapStateToProps, mapActionsToProps)(GraphPage)
