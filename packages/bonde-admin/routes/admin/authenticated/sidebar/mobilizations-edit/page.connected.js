//
// @route /mobilizations/:mobilization_id/edit
//
import { connect } from 'react-redux'

import { selectMobilization, asyncFetchBlocks, asyncFetchWidgets } from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'

import Page from './page'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)
  return {
    mobilization: selectors.getMobilization(),
    blocks: selectors.getBlocks(),
    blocksIsLoaded: selectors.blocksIsLoaded(),
    renderIsLoading: selectors.renderIsLoading(),
    mobilizationIsNeedReload: selectors.mobilizationIsNeedReload()
  }
}

const mapDispatchToProps = {
  selectMobilization,
  asyncFetchBlocks,
  asyncFetchWidgets
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
