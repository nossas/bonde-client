import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './pressure-form.scss'
import { isValidEmail } from '../../../../../util/validation-helper'

// TODO: Reusable Input
const controlClassname = 'px3 py1'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem',
  outline: 'none'
}

class PressureForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      lastname: '',
      city: '',
      subject: props.subject,
      body: props.body
    }
  }

  validate() {
    const { widget: { settings: { show_city } } } = this.props
    const requiredMsg = 'Preenchimento obrigatório'
    const errors = { valid: true }
    if (!this.state.email) {
      errors.valid = false
      errors.email = requiredMsg
    } else if (!isValidEmail(this.state.email)) {
      errors.valid = false
      errors.email = 'E-mail inválido'
    }
    if (!this.state.name) {
      errors.valid = false
      errors.name = requiredMsg
    }
    if (!this.state.lastname) {
      errors.valid = false
      errors.lastname = requiredMsg
    }
    if (show_city === 'city-true' && !this.state.city) {
      errors.valid = false
      errors.city = requiredMsg
    }
    if (!this.state.subject) {
      errors.valid = false
      errors.subject = requiredMsg
    }
    if (!this.state.body) {
      errors.valid = false
      errors.body = requiredMsg
    }
    return errors
  }

  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const errors = this.validate()
    if (!errors.valid) {
      this.setState({ errors })
    } else {
      onSubmit && onSubmit(this.state)
    }
  }

  render() {
    const { buttonColor, buttonText, children, widget } = this.props
    const { email, name, lastname, city, subject, body, errors } = this.state
    return (
      <form className="pressure-form" onSubmit={::this.handleSubmit}>
        <div className={classnames('activist-form bg-white', !children ? 'rounded-bottom': null)}>
          <div className="form bg-white rounded-bottom">
            <div className={classnames('form-group', controlClassname)}>
              <label className="py1 gray" htmlFor="pressure-sender-email-id">
                E-mail
                {(errors && errors['email'] && <span className="error">{errors['email']}</span>)}
              </label>
              <input
                id="pressure-sender-email-id"
                className="col-12"
                style={inputReset}
                type="email"
                placeholder="Insira seu e-mail"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className={classnames('form-group', controlClassname)}>
              <label className="py1 gray" htmlFor="pressure-sender-email-id">
                Nome
                {(errors && errors['name'] && <span className="error">{errors['name']}</span>)}
              </label>
              <input
                className="col-12"
                style={inputReset}
                type="text"
                placeholder="Insira seu nome"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className={classnames('form-group', controlClassname)}>
              <label className="py1 gray" htmlFor="pressure-sender-email-id">
                Sobrenome
                {(errors && errors['lastname'] && <span className="error">{errors['lastname']}</span>)}
              </label>
              <input
                className="col-12"
                style={inputReset}
                type="text"
                placeholder="Insira seu sobrenome"
                value={lastname}
                onChange={e => this.setState({ lastname: e.target.value })}
              />
            </div>
            {
              !widget.settings.show_city || widget.settings.show_city !== 'city-true' ? null : (
                <div className={classnames('form-group', controlClassname)}>
                  <label className="py1 gray" htmlFor="pressure-sender-city-id">
                    Cidade
                    {(errors && errors['city'] && <span className="error">{errors['city']}</span>)}
                  </label>
                  <input
                    className="col-12"
                    style={inputReset}
                    type="text"
                    placeholder="Insira seu cidade"
                    value={city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </div>
              )
            }
            <div className={classnames('form-group', controlClassname)}>
              <label className="py1 gray" htmlFor="pressure-subject-id">
                Assunto
                {(errors && errors['subject'] && <span className="error">{errors['subject']}</span>)}
              </label>
              <input
                id="pressure-subject-id"
                className="col-12"
                style={inputReset}
                type="text"
                value={subject}
                onChange={e => this.setState({ subject: e.target.value })}
              />
            </div>
            <div className={classnames('form-group', controlClassname)}>
              <label className="py1 gray" htmlFor="pressure-body-id">
                Corpo do e-mail
                {(errors && errors['body'] && <span className="error">{errors['body']}</span>)}
              </label>
              <textarea
                id="pressure-body-id"
                className="col-12 mt1"
                style={{...inputReset, height: '7rem'}}
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
              />
            </div>
          </div>
          <div className="pt1 pb3 px3">
            <button
              type="submit"
              onClick={::this.handleSubmit}
              className="btn caps white col-12 py2 rounded"
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText}
            </button>
          </div>
        </div>
        {children}
      </form>
    )
  }
}

PressureForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
  widget: PropTypes.object
}

PressureForm.defaultProps = {
  subject: '',
  body: ''
}

export default PressureForm
