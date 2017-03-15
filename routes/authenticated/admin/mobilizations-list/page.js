import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { browserHistory } from 'react-router'

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
import List from '~mobilizations/components/list'
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
} from '~mobilizations/components/list/items'
import { PageHeader } from '~mobilizations/components'
import * as MobilizationActions from '~mobilizations/action-creators'

export class MobilizationsListPage extends Component {

  componentWillMount () {
    this.props.select(undefined)
    this.props.toggleMenu(undefined)
  }

  handleSelectItem (mobilization) {
    this.props.select(mobilization.id)
    browserHistory.push(paths.editMobilization(mobilization.id))
  }

  render () {
    const { location, mobilizations, menuActiveIndex } = this.props

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

                <More onClick={() => this.props.toggleMenu(index)} index={index}>
                  <MoreMenu active={menuActiveIndex === index}>
                    <MoreMenuAction
                      componentClass='a'
                      target='_blank'
                      text='Abrir página'
                      path={paths.mobilization(mobilization)}
                      icon='external-link'
                    />
                    <MoreMenuAction
                      text='Criar template'
                      path={paths.mobilizationTemplatesCreate(mobilization)}
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

MobilizationsListPage.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  menuActiveIndex: PropTypes.number,
  select: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // Injected by react-router
  location: PropTypes.object.isRequired
}

export default MobilizationsListPage
