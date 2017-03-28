import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

// Global module dependencies
import * as paths from '~client/paths'
import { isValidEmail } from '~utils/validation-helper'
import { Error, Input } from '~components/form-util'

// Parent module dependencies
import { WidgetOverlay, FinishMessageCustom } from '~mobilizations/widgets/components'

// Current module dependencies
import * as MatchActions from '../action-creators'
import { Choices, MatchTellAFriend } from '../components'

class Match extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numberSelected: undefined,
      letterSelected: undefined,
      combined: false,
      errors: []
    }
  }

  redirectTo (e) {
    const { mobilization, widget, editable } = this.props
    if (e) e.preventDefault()
    if (editable) {
      browserHistory.push(
        paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
      )
    }
  }

  formIsValid () {
    const { firstname, lastname, email } = this.state
    let errors = []

    if (!firstname) errors.push('O campo Nome não pode ficar em branco.')
    if (!lastname) errors.push('O campo Sobrenome não pode ficar em branco.')
    if (!email) errors.push('O campo Email não pode ficar em branco.')
    else if (!isValidEmail(email)) errors.push('Email inválido.')

    const hasErrors = errors.length !== 0
    if (hasErrors) this.setState({ errors })
    return !hasErrors
  }

  handleCombineClick (e) {
    if (e) e.preventDefault()
    if (this.formIsValid()) {
      const { dispatch } = this.props
      const { firstname, lastname, email } = this.state
      const matchItem = this.findMatchItem()
      const activist = { firstname, lastname, email }

      if (matchItem) {
        const matchId = matchItem.id
        dispatch(MatchActions.asyncMatchActivistCreate({ matchId, activist }))
        this.setState({ combined: true })
      } else {
        window.alert('Nenhuma imagem foi configurada para a combinação.')
      }
    }
  }

  enableMatchButton () {
    const { selectedChoice1, selectedChoiceA } = this.state
    return selectedChoice1 && selectedChoiceA
  }

  renderErrors () {
    const { errors } = this.state
    return errors.length > 0 && (
      <div>{errors.map(error => <Error message={error} />)}</div>
    )
  }

  renderChoices () {
    const { selectedChoice1, selectedChoiceA } = this.state
    const { editable, loading } = this.props
    const { widget: { settings: {
        title_text: titleText,
        labelChoices1, labelChoicesA,
        choices1, choicesA
      }},
      mobilization: { header_font: headerFont }
    } = this.props
    const optionsChoices1 = choices1 ? choices1.split(',') : []
    const optionsChoicesA = choicesA ? choicesA.split(',') : []

    return (
      <WidgetOverlay editable={editable} onClick={::this.redirectTo}>
        <div className='match-widget widget form-redux transparent p3 bg-darken-3 relative rounded'>
          <h2 className='mt0 mb3 center white' style={{ fontFamily: headerFont }}>
            {titleText}
          </h2>
          <Choices
            className='form-group mb2'
            title={labelChoices1}
            selected={this.state.numberSelected}
            options={optionsChoices1}
            onChange={(option) => {
              this.setState({ selectedChoice1: option.target.value })
            }}
          />
          <Choices
            {...this.props}
            className='form-group mb2'
            title={labelChoicesA}
            selected={this.state.letterSelected}
            options={optionsChoicesA}
            disabled={!(selectedChoice1)}
            onChange={(option) => {
              this.setState({ selectedChoiceA: option.target.value })
            }}
          />
          <Input
            uid='input-match-firstname'
            type='text'
            label='Nome'
            placeholder='Insira aqui seu nome'
            required
            onChange={e => { this.setState({ firstname: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          <Input
            uid='input-match-lastname'
            type='text'
            label='Sobrenome'
            placeholder='Insira aqui seu sobrenome'
            required
            onChange={e => { this.setState({ lastname: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          <Input
            uid='input-match-email'
            type='email'
            label='Email'
            placeholder='Insira aqui seu email'
            required
            onChange={e => { this.setState({ email: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          {this.renderErrors()}
          <button
            className='match caps btn bg-darken-4 p2 col-12 mt1 mb2 rounded white'
            onClick={::this.handleCombineClick}
            disabled={loading || !(this.enableMatchButton())}>
            {loading ? 'Combinando...' : 'Combinar'}
          </button>
        </div>
      </WidgetOverlay>
    )
  }

  findMatchItem () {
    const { widget } = this.props
    const matchList = widget.match_list.filter(match => {
      const { first_choice: firstChoice, second_choice: secondChoice } = match
      const { selectedChoice1, selectedChoiceA } = this.state
      return firstChoice === selectedChoice1 && secondChoice === selectedChoiceA
    })
    if (matchList && matchList.length > 0) {
      return matchList[0]
    }
  }

  renderShareButtons () {
    const { mobilization, widget } = this.props
    const { settings: { finish_message_type: finishMessageType } } = widget
    return finishMessageType === 'custom' ? (
      <FinishMessageCustom widget={widget} />
    ) : (
      <MatchTellAFriend
        mobilization={mobilization}
        matchItem={this.findMatchItem()}
      />
    )
  }

  render () {
    const { combined } = this.state
    return (
      <div>
        {combined ? this.renderShareButtons() : this.renderChoices()}
      </div>
    )
  }
}

Match.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message_type: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Match
