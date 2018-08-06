import React from 'react'
import { I18n } from 'react-i18next'
import {
  Flexbox,
  IconColorful,
  Title
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

export default () => (
  <I18n ns='auth'>
    {(t) => {
      const spacing = { bottom: 25 }
      return (
        <Flexbox>
          {/* TODO: know, why require use of div here? */}
          <div>
            <IconColorful name='mobilization' size={80} />
          </div>
          <Title.H2 margin={{ y: 20 }}>
            {t('forgetPassword.successfully.title')}
          </Title.H2>
          <Title.H4 margin={spacing}>
            {t('forgetPassword.successfully.checkEmail')}
          </Title.H4>
          <Title.H4 margin={spacing}>
            {t('forgetPassword.successfully.checkSpam')}
          </Title.H4>
          <Title.H4 margin={spacing}>
            {t('forgetPassword.successfully.checkExpiry')}
          </Title.H4>
          <ButtonLink to='/auth/login'>{t('forgetPassword.goback')}</ButtonLink>
        </Flexbox>
      )
    }}
  </I18n>
)
