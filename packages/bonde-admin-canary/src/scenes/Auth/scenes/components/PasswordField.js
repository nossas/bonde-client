import React, { Fragment } from 'react'
import {
  Checkbox,
  FormField,
  Input
} from 'bonde-styleguide'
import { translate } from 'services/i18n'
import PropTypes from 'prop-types'

class PasswordField extends React.Component {
  state = { showPassword: false }

  render () {
    const { showPassword } = this.state
    const { t, ...props } = this.props

    return (
      <Fragment>
        <FormField
          type={!showPassword ? 'password' : 'text'}
          placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
          inputComponent={Input}
          {...props}
        />
        {props.input.value && props.input.value.length > 0 && (
          <Checkbox
            checked={showPassword}
            onChange={() => this.setState({ showPassword: !showPassword })}
          >
            {t('links.showPassword')}
          </Checkbox>
        )}
      </Fragment>
    )
  }
}

PasswordField.propTypes = {
  t: PropTypes.func
}

export default translate('auth')(PasswordField)
