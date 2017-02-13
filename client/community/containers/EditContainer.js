import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from '~components/navigation'
import { SettingsPageLayout, SettingsPageMenuLayout, SettingsPageContentLayout } from '~components/layout'

import Sidebar from '~components/navigation/sidebar'
import getSidebarProps from '~components/navigation/sidebar/map-state-to-props'

import * as selectors from '../selectors'
import * as paths from '../paths'

class EditContainer extends Component {

  render () {
    const { children, community, location: { pathname }, sidebarProps } = this.props

    const editPath = paths.edit('info')
    const mailchimpPath = paths.edit('mailchimp')
    const recipientPath = paths.edit('recipient')

    return (
      <Sidebar {...sidebarProps}>
        <SettingsPageLayout>
          <SettingsPageMenuLayout title='Configurações da comunidade'>
            <Tabs>
              <Tab text='Informações' path={editPath} isActive={editPath === pathname} />
              <Tab text='Mailchimp' path={mailchimpPath} isActive={mailchimpPath === pathname} />
              <Tab text='Recebedor' path={recipientPath} isActive={recipientPath === pathname} />
            </Tabs>
          </SettingsPageMenuLayout>
          <SettingsPageContentLayout>
            {children && React.cloneElement(children, { community })}
          </SettingsPageContentLayout>
        </SettingsPageLayout>
      </Sidebar>
    )
  }
}

const mapStateToProps = state => ({
  community: selectors.getCurrent(state),
  sidebarProps: getSidebarProps(state)
})

export default connect(mapStateToProps)(EditContainer)
