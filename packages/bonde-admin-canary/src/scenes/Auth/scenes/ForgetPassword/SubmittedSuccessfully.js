import React from 'react'
import { I18n } from 'react-i18next'
import {
  Flexbox,
  IconColorful,
  Title,
  Text
} from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const SubmittedSuccessfully = () => (
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
          <Text margin={spacing}>
            {t('forgetPassword.successfully.checkEmail')}
          </Text>
          <Text margin={spacing}>
            {t('forgetPassword.successfully.checkSpam')}
          </Text>
          <Text margin={spacing}>
            {t('forgetPassword.successfully.checkExpiry')}
          </Text>
          <ButtonLink to='/auth/login'>{t('forgetPassword.goback')}</ButtonLink>
        </Flexbox>
      )
    }}
  </I18n>
)

export default SubmittedSuccessfully
