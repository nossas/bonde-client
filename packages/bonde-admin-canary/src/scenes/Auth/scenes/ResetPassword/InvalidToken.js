import React from 'react'
import { Trans } from 'react-i18next'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import Link, { ButtonLink } from 'components/Link'
import PropTypes from 'prop-types'

const InvalidToken = ({ t }) => (
  <Flexbox vertical>
    <Title.H2 margin={{ bottom: 20 }}>{t('resetPassword.invalidToken.title')}</Title.H2>
    <Title.H4 margin={{ bottom: 25 }}>{t('resetPassword.invalidToken.subtitle')}</Title.H4>
    <Title.H4 margin={{ bottom: 25 }}>
      <Trans i18nKey='resetPassword.invalidToken.resendToken'>
        <Link to='/auth/forget-password'>{`click here`}</Link>
      </Trans>
    </Title.H4>
    <ButtonLink to='/auth/login'>
      {t('resetPassword.invalidToken.goBackLogin')}
    </ButtonLink>
  </Flexbox>
)

InvalidToken.propTypes = {
  t: PropTypes.func
}

export default InvalidToken
