import PropTypes from 'prop-types'
import React from 'react'
import { Tabs, Tab } from '~client/components/navigation'
import { SettingsPageMenuLayout } from '~client/components/layout'

import * as paths from '~client/paths'

const SettingsMenu = ({ location: { pathname } }) => {
  const infoPath = paths.communityInfo()
  const mailchimpPath = paths.communityMailchimp()
  const recipientPath = paths.communityRecipient()
  const reportPath = paths.communityReport()

  // Check domain page
  const domainPaths = [paths.communityDomain(), paths.communityDomainCreate()]
  const domainPageIsActive = domainPaths.indexOf(pathname) !== -1

  return (
    <SettingsPageMenuLayout title='Configurações da comunidade'>
      <Tabs>
        <Tab text='Informações' path={infoPath} isActive={infoPath === pathname} />
        <Tab text='Mailchimp' path={mailchimpPath} isActive={mailchimpPath === pathname} />
        <Tab text='Recebedor' path={recipientPath} isActive={recipientPath === pathname} />
        <Tab text='Relatório' path={reportPath} isActive={reportPath === pathname} />
        <Tab text='Domínios' path={paths.communityDomain()} isActive={domainPageIsActive} />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default SettingsMenu
