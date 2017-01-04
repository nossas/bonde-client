import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from '../../../components/Navigation'
import { SettingsPageLayout, SettingsPageMenuLayout, SettingsPageContentLayout } from '../../../components/Layout'

import * as paths from '../paths'


class EditContainer extends Component {

  render() {

    const { children, community, location: { pathname } } = this.props

    const editPath = paths.edit('info')
    const mailchimpPath = paths.edit('mailchimp')
    const recipientPath = paths.edit('recipient')

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Configurações da comunidade">
          <Tabs>
            <Tab text="Informações" path={editPath} isActive={editPath === pathname} />
            <Tab text="Mailchimp" path={mailchimpPath} isActive={mailchimpPath === pathname} />
            <Tab text="Recebedor" path={recipientPath} isActive={recipientPath === pathname} />
          </Tabs>
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout>
          {children && React.cloneElement(children, { community })}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = ({ community }) => ({
  community: community.data.filter(c => c.id === community.currentId)[0],
})

export default connect(mapStateToProps)(EditContainer)
