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
import List from '../components/list'
import {
  Item,
  Avatar,
  Name,
  CreatedAt,
  Users,
  FundRaising,
  More,
  MoreMenu,
  MoreMenuAction
} from '../components/list/items'
import { PageHeader } from '..//components'
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
          <PageHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName='lg-col-12'>
          <List>
            <Item.Header>
              <Name.Header />
              <CreatedAt.Header />
              <Users.Header />
              <FundRaising.Header />
            </Item.Header>

            {mobilizations && mobilizations.map((mobilization, index) => (
              <Item
                key={`item-${mobilization.id}`}
                className={classnames({ 'z2': menuActiveIndex === index })}
              >
                <div className='gray20' onClick={() => this.handleSelectItem(mobilization)}>
                  <Avatar {...mobilization} />

                  <div className='list-item-table-container overflow-hidden'>
                    <Name {...mobilization} />
                    <CreatedAt {...mobilization} />
                    <Users {...mobilization} />
                    <FundRaising {...mobilization} />
                  </div>
                </div>

                <More onClick={toggleMenu} index={index}>
                  <MoreMenu active={menuActiveIndex === index}>
                    <MoreMenuAction
                      componentClass='a'
                      target='_blank'
                      text='Abrir página'
                      path={paths.mobilization(mobilization)}
                      icon='external-link'
                    />
                    <MoreMenuAction
                      componentClass='a'
                      text='Criar template'
                      onClick={() => this.handleCreateTemplate(mobilization)}
                      icon='star'
                    />
                  </MoreMenu>
                </More>
              </Item>
            ))}
          </List>
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
