import React from 'react'

import ControlLabel from '../ControlLabel/ControlLabel'
import Flexbox from '../../layout/Flexbox/Flexbox'
import InputAdornment from '../InputAdornment/InputAdornment'
import InputHint from '../InputHint/InputHint'

interface MetaProps {
  /** Valid style. */
  valid: boolean;
  /** Error text. The invalid input style is based on existence of this prop. */
  error: string | boolean;
  touched: boolean;
  dirty: boolean;
}

interface Props {
  /** Label text. */
  label: string;
  meta: MetaProps
  /** Hint text. */
  hint?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Show valid theme in input when finish validation */
  showValid?: boolean;
  inputComponent: any
  input: any
}

/**
 * Full field component that composes ControlLabel, props.inputComponent,
 * InputHint and InputAdornment components.
 */
class FormField extends React.Component<Props> {

  static defaultProps = {
    meta: {},
    showValid: true
  }

// FormField.displayName = 'FormField'
  render () {
    const {
      label,
      hint,
      placeholder,
      meta: { error, valid, touched },
      inputComponent: InputComponent,
      input,
      showValid,
      ...props
    } = this.props

    const adornmentProps: any = {}
    let showAdornment = false

    if (touched) {
      if (!!error) {
        adornmentProps.invalid = true
        showAdornment = true
      } else if (valid && showValid) {
        adornmentProps.valid = true
        showAdornment = true
      }
    }

    return (
      <div style={{ padding: '0 0 17px' }}>
        <Flexbox horizontal>
          <ControlLabel>{label}</ControlLabel>
          {(touched && error && typeof error === 'string') && <InputHint invalid={true}>{error}</InputHint>}
          {(hint && (!error || !touched)) && <InputHint>{hint}</InputHint>}
        </Flexbox>
        <Flexbox horizontal>
          <InputComponent
            fullWidth
            invalid={touched && !!error}
            valid={touched && valid}
            placeholder={placeholder}
            touched={touched}
            showValid={showValid}
            {...input}
            {...props}
          />
          {showAdornment && (<InputAdornment {...adornmentProps} />)}
        </Flexbox>
      </div>
    )
  }
}

/** @component */
export default FormField
