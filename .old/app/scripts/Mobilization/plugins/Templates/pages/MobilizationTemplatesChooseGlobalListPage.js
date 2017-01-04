import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

import * as Paths from '../../../../Paths'
import { MobilizationTemplatesSelectableList } from '../components'
import * as MobilizationActions from '../../../MobilizationActions'
import { NewMobilizationHeader } from '../../../components'

@reactMixin.decorate(Navigation)
export class MobilizationTemplatesChooseGlobalListPage extends Component {
  render() {
    const {
      location,
      mobilization,
      mobilizationTemplates,
      selectedIndex: mobilizationTemplateId,
      createMobilizationFromTemplateAsync
    } = this.props

    const next = () => this.transitionTo(Paths.editMobilization(mobilization.id))

    return (
      <div className="flex-auto bg-silver gray">
        <NewMobilizationHeader location={location} />
        <div className="p3 lg-col-5 mx-auto">
          <h3 className="h1 mt0 mb3 center">Templates globais</h3>
          <MobilizationTemplatesSelectableList
            list={mobilizationTemplates.global}
            onClickButton={() => createMobilizationFromTemplateAsync(
              mobilizationTemplateId,
              mobilization.id,
              next
            )}
          />
        </div>
      </div>
    )
  }
}

MobilizationTemplatesChooseGlobalListPage.propTypes = {
  location: PropTypes.object,
  mobilization: PropTypes.object,
  mobilizationTemplates: PropTypes.object,
  createMobilizationFromTemplateAsync: PropTypes.func
}

const mapStateToProps = state => ({
  selectedIndex: state.selectableList.selectedIndex,
  filterableSearchBarList: state.filterableSearchBar.list
})

export default connect(
  mapStateToProps,
  MobilizationActions
)(MobilizationTemplatesChooseGlobalListPage)
