import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

// Global module dependencies
import * as paths from '~client/paths'
import * as SelectableActions from '~components/selectable-list/actions'

// Parent module dependencies
import * as MobilizationActions from '~mobilizations/action-creators'
import * as MobilizationSelectors from '~mobilizations/selectors'

// Current module dependencies
import { TemplateSelectableList } from '../components'
import * as TemplateSelectors from '../selectors'

@reactMixin.decorate(Navigation)
export class TemplateChooseGlobalPage extends Component {
  render () {
    const { mobilization, createMobilizationFromTemplate, ...listableProps } = this.props

    return (
      <div className='choose-global-page col-12'>
        <h3 className='h1 mt0 mb3 center'>Meus Templates</h3>
        <TemplateSelectableList
          {...listableProps}
          handleSelectItem={({ id: template_mobilization_id }) => {
            createMobilizationFromTemplate({ id: mobilization.id, template_mobilization_id })
              .then(() => {
                this.transitionTo(paths.editMobilization(mobilization.id))
                return Promise.resolve()
              })
              .catch(error => console.error('CreateMobilizationFromTemplateAsyncError', error))
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  templates: TemplateSelectors.getGlobalTemplates(state),
  filterableTemplates: TemplateSelectors.getFilterableTemplates(state),
  selectedIndex: TemplateSelectors.getSelectableIndex(state)
})

const mapActionCreatorsToProps = {
  setSelectedIndex: SelectableActions.setSelectedIndex,
  createMobilizationFromTemplate: MobilizationActions.asyncUpdate
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(TemplateChooseGlobalPage)
