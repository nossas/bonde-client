import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { BondeBackground } from '~client/components/layout/background'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from '~client/components/forms'
import styles from './page.scss'

const RegisterPage = ({ fields: { email }, intl, ...formProps }) => (
  <BondeBackground>
    <div className={styles.page}>
      <h1>
        <FormattedMessage
          id='p--account-retrieve.title.first-line'
          defaultMessage='Qual seu email cadastrado?'
        />
        <br />
        <FormattedMessage
          id='p--account-retrieve.title.second-line'
          defaultMessage='Vamos enviar uma nova senha para você.'
        />
      </h1>

      <FormRedux
        nosubmit
        className='bg-white rounded col-8'
        {...formProps}
      >
        <FormGroup controlId='emailId' {...email}>
          <ControlLabel>
            <FormattedMessage
              id='p--account-retrieve.form.email.label'
              defaultMessage='E-mail'
            />
          </ControlLabel>

          <FormControl
            type='email'
            placeholder={
              intl.formatMessage({
                id: 'p--account-retrieve.form.email.placeholder',
                defaultMessage: 'exemplo@email.com.br'
              })
            }
          />
        </FormGroup>
        <Button type='submit' className='btn caps col-12 p2 white rounded-bottom bg-pagenta'>
          {formProps.submitting ? (
            <FormattedMessage
              id='p--account-retrieve.form.submit-button.sending'
              defaultMessage='Enviando...'
            />
          ) : (
            <FormattedMessage
              id='p--account-retrieve.form.submit-button.default'
              defaultMessage='Enviar'
            />
          )}
        </Button>
      </FormRedux>
    </div>
  </BondeBackground>
)

RegisterPage.propTypes = {
  // Injected by react-redux
  submit: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default injectIntl(RegisterPage)
