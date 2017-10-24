import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation'


const Container = ({ children, intl }) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout
      title={intl.formatMessage({
        id: 'page--communication.title',
        defaultMessage: 'Nova campanha de email'
      })}
    >
      <Tabs>
        <Tab
          isActive={true}
          path='/communication'
          text={intl.formatMessage({
            id: 'page--communication.tabs.content',
            defaultMessage: 'Conteúdo'
          })}
        />
      </Tabs>
    </SettingsPageMenuLayout>
    <SettingsPageContentLayout>
      {children}
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

Container.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Container)
