import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Navigation } from 'react-router'
import reactMixin from 'react-mixin'

// Global module dependencies
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import * as paths from '~client/paths'

// Children module dependencies
import * as TemplateActions from '~mobilizations/templates/action-creators'

// Current module dependencies
import MobilizationList from '~tmp-mobilizations/components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore,
  MobilizationListItemMoreMenu,
  MobilizationListItemMoreMenuAction
} from '~tmp-mobilizations/components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderUsers,
  MobilizationListItemHeaderFundRaising
} from '~tmp-mobilizations/components/MobilizationList/MobilizationListItemHeader'
import { MobilizationsHeader } from '~tmp-mobilizations/components'
import { select, toggleMenu } from '../action-creators'
import * as MobilizationSelectors from '../selectors'

@reactMixin.decorate(Navigation)
export class MobilizationListPage extends Component {

  componentWillMount () {
    const { select, toggleMenu } = this.props
    select(undefined)
    toggleMenu(undefined)
  }

  handleSelectItem (mobilization) {
    this.props.select(mobilization.id)
    this.transitionTo(paths.editMobilization(mobilization.id))
  }

  handleCreateTemplate (mobilization) {
    this.props.selectTemplate(mobilization.id)
    this.transitionTo(paths.mobilizationTemplatesCreate(mobilization))
  }

  render () {
    const {
      location,
      mobilizations,
      menuActiveIndex,
      toggleMenu
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Suas Mobilizações'>
          <MobilizationsHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName='lg-col-12'>
          <MobilizationList>
            <MobilizationListItemHeader>
              <MobilizationListItemHeaderName />
              <MobilizationListItemHeaderCreatedAt />
              <MobilizationListItemHeaderUsers />
              <MobilizationListItemHeaderFundRaising />
            </MobilizationListItemHeader>

            {mobilizations && mobilizations.map((mobilization, index) => (
              <MobilizationListItem
                key={`mobilization-${mobilization.id}`}
                className={classnames({ 'z2': menuActiveIndex === index })}
              >
                <div className='gray20' onClick={() => this.handleSelectItem(mobilization)}>
                  <MobilizationListItemAvatar {...mobilization} />

                  <div className='list-item-table-container overflow-hidden'>
                    <MobilizationListItemName {...mobilization} />
                    <MobilizationListItemCreatedAt {...mobilization} />
                    <MobilizationListItemUsers {...mobilization} />
                    <MobilizationListItemFundRaising {...mobilization} />
                  </div>
                </div>
                <MobilizationListItemMore onClick={toggleMenu} index={index}>
                  <MobilizationListItemMoreMenu active={menuActiveIndex === index}>
                    <MobilizationListItemMoreMenuAction
                      componentClass='a'
                      target='_blank'
                      text='Abrir página'
                      path={paths.mobilization(mobilization)}
                      icon='external-link'
                    />
                    <MobilizationListItemMoreMenuAction
                      componentClass='a'
                      text='Criar template'
                      onClick={() => this.handleCreateTemplate(mobilization)}
                      icon='star'
                    />
                  </MobilizationListItemMoreMenu>
                </MobilizationListItemMore>
              </MobilizationListItem>
            ))}
          </MobilizationList>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

MobilizationListPage.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  menuActiveIndex: PropTypes.number,
  // Injected by react-router
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  mobilizations: MobilizationSelectors.getList(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state)
})

const mapActionCretorsToProps = {
  select,
  toggleMenu,
  selectTemplate: TemplateActions.selectTemplate
}

export default connect(mapStateToProps, mapActionCretorsToProps)(MobilizationListPage)
