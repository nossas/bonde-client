import React, { Component, PropTypes } from 'react'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { isValidEmail } from '../../../../../util/validation-helper'
import { Error, Input } from '../../../../../components/FormUtil'

// Parent module dependencies
import { WidgetOverlay, FinishMessageCustom } from '../../../components'

// Current module dependencies
import * as MatchActions from '../action-creators'
import { Choices, MatchTellAFriend } from '../components'

class Match extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      numberSelected: undefined,
      letterSelected: undefined,
      combined: false,
      errors: []
    }
  }

  redirectTo(e) {
    const { mobilization, widget, editable } = this.props
    if (e) e.preventDefault()
    if (editable) {
      this.context.router.transitionTo(
        Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
      )
    }
  }

  formIsValid() {
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

  handleCombineClick(e) {
    if (e) e.preventDefault()
    if (this.formIsValid()) {
      const { dispatch }  = this.props
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

  enableMatchButton() {
    const { selectedChoice1, selectedChoiceA } = this.state
    return selectedChoice1 && selectedChoiceA
  }

  renderErrors() {
    const { errors } = this.state
    return (
      errors.length > 0
      && <div>{errors.map(error => <Error message={error} />)}</div>
    )
  }

  renderChoices() {
    const {
      selectedChoice1, selectedChoiceA,
      name, email,
      numberSelected, letterSelected
    } = this.state
    const { editable, loading } = this.props
    const { widget: { settings: {
        title_text,
        labelChoices1, labelChoicesA,
        choices1, choicesA
      }},
      mobilization: { header_font: headerFont }
    } = this.props
    const optionsChoices1 = choices1 ? choices1.split(',') : []
    const optionsChoicesA = choicesA ? choicesA.split(',') : []

    return (
      <WidgetOverlay editable={editable} onClick={::this.redirectTo}>
        <div className="match-widget widget form-redux transparent p3 bg-darken-3 relative rounded">
          <h2 className="mt0 mb3 center white" style={{ fontFamily: headerFont }}>
            {title_text}
          </h2>
          <Choices
            className="form-group"
            title={labelChoices1}
            selected={this.state.numberSelected}
            options={optionsChoices1}
            onChange={(option) => {
              this.setState({ selectedChoice1: option.target.value })
            }}
            className="form-group mb2"
          />
          <Choices
            { ...this.props }
            className="form-group"
            title={labelChoicesA}
            selected={this.state.letterSelected}
            options={optionsChoicesA}
            disabled={!(selectedChoice1)}
            onChange={(option) => {
              this.setState({ selectedChoiceA: option.target.value })
            }}
            className="form-group mb2"
          />
          <Input
            uid="input-match-firstname"
            type="text"
            label="Nome"
            placeholder="Insira aqui seu nome"
            required={true}
            onChange={e => { this.setState({ firstname: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          <Input
            uid="input-match-lastname"
            type="text"
            label="Sobrenome"
            placeholder="Insira aqui seu sobrenome"
            required={true}
            onChange={e => { this.setState({ lastname: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          <Input
            uid="input-match-email"
            type="email"
            label="Email"
            placeholder="Insira aqui seu email"
            required={true}
            onChange={e => { this.setState({ email: e.target.value }) }}
            show={!!selectedChoiceA}
          />
          {this.renderErrors()}
          <button
            className="match caps btn bg-darken-4 p2 col-12 mt1 mb2 rounded white"
            onClick={::this.handleCombineClick}
            disabled={loading || !(this.enableMatchButton())}>
            {loading ? 'Combinando...' : 'Combinar' }
          </button>
        </div>
      </WidgetOverlay>
    )
  }

  findMatchItem() {
    const { widget } = this.props
    const matchList = widget.match_list.filter(match => {
      const { first_choice, second_choice } = match
      const { selectedChoice1, selectedChoiceA } = this.state
      return first_choice === selectedChoice1 && second_choice === selectedChoiceA
    })
    if (matchList && matchList.length > 0) {
      return matchList[0]
    }
  }

  renderShareButtons() {
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

  render() {
    const { combined } = this.state
    return (
      <div>
        { combined ? this.renderShareButtons() : this.renderChoices() }
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

Match.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default Match
