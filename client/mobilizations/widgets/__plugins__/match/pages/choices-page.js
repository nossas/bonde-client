import React, { PropTypes } from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { SettingsPageContentLayout } from '~components/layout'

// Parent module dependencies
import * as WidgetActions from '~mobilizations/widgets/action-creators'

// Current module dependencies
import * as MatchActions from '../action-creators'
import { AddChoiceForm, Page } from '../components'

class ChoicesPage extends React.Component {
  constructor (props, context) {
    super(props, context)
    const {
      settings: {
        title_text,
        choicesA, labelChoicesA,
        choices1, labelChoices1
      }
    } = this.widget()

    this.state = {
      loading: false,
      title_text,
      labela: labelChoices1 || '',
      choicesa: choices1 ? choices1.split(',') : [],
      labelb: labelChoicesA || '',
      choicesb: choicesA ? choicesA.split(',') : [],
      errors: {}
    }
  }

  widget (props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    const widget = widgets[widgetIndex]
    return widget
  }

  isValidForm () {
    const { title_text: titleText, choicesa, choicesb } = this.state

    const isEmptyTitle = (titleText === undefined || titleText.length === 0)
    const isEmptySideA = (choicesa === undefined || choicesa.length === 0)
    const isEmptySideB = (choicesb === undefined || choicesb.length === 0)

    let errors = {}
    if (isEmptyTitle) {
      errors.isEmptyTitle = 'Insira o titulo do bloco'
    }
    if (isEmptySideA) {
      errors.isEmptySideA = 'Insira ao menos uma opção de escolha'
    }
    if (isEmptySideB) {
      errors.isEmptySideB = 'Insira ao menos uma opção de escolha'
    }
    return {
      validForm: !(isEmptyTitle || isEmptySideA || isEmptySideB),
      errors: errors
    }
  }

  isDisableButon () {
    const { validForm } = this.isValidForm()
    return !validForm
  }

  handleSubmit (e) {
    if (e) e.preventDefault()

    const widget = this.widget()
    const { dispatch, mobilization } = this.props
    const { title_text, labela, choicesa, labelb, choicesb } = this.state
    const { validForm, errors } = this.isValidForm()

    if (validForm) {
      dispatch(WidgetActions.asyncWidgetUpdate({
        ...widget,
        settings: {
          title_text,
          labelChoices1: labela,
          choices1: choicesa.toString(),
          labelChoicesA: labelb,
          choicesA: choicesb.toString()
        }
      }))
      this.setState({ choicesChanged: false })
      this.context.router.transitionTo(
        paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)
      )
    } else {
      this.setState({ errors })
    }
  }

  onChangeLabel (attr, label) {
    let newState = {}
    newState[attr] = label
    this.setState(newState)
  }

  onAddItem (attr, choice) {
    let newState = {}

    let choices = this.state[attr]
    choices.push(choice)

    newState[attr] = choices
    this.setState(newState)
  }

  onRemoveItem (attr, choice) {
    let newState = {}
    const { dispatch } = this.props

    let choices = this.state[attr]
    const index = choices.indexOf(choice)
    if (index > -1) {
      choices.splice(index, 1)
    }

    newState[attr] = choices
    this.setState(newState)

    const attrRemove = attr === 'choicesa' ? 'first_choice' : 'second_choice'
    let match = {}
    match[attrRemove] = choice
    dispatch(MatchActions.asyncMatchDestroy({ where: match, props: this.props }))
  }

  handleTitleTextChange (e) {
    this.setState({ title_text: e.target.value })
  }

  render () {
    const widget = this.widget()
    const { mobilization, location } = this.props
    const { title_text: titleText, choicesa, choicesb, labela, labelb } = this.state

    return (
      <Page
        mobilization={mobilization}
        location={location}
        widget={widget}
      >
        <SettingsPageContentLayout>
          <form
            className='form-redux transparent btn-float'
            onSubmit={::this.handleSubmit}
          >
            <div className='form-group sm-col sm-col-12'>
              <label htmlFor='title_text'>
                Título do bloco de combinações
              </label>
              {
                !this.state.errors.isEmptyTitle ? null : (
                  <span className='red ml2'>{this.state.errors.isEmptyTitle}</span>
                )
              }
              <input
                id='title_text'
                type='text'
                className='input block h3 col-12 mt1 mb3 h5'
                placeholder='Ex.: Combine assuntos e compartilhe memes.'
                style={{ height: '48px' }}
                value={titleText}
                onChange={::this.handleTitleTextChange}
                tabIndex='1'
              />
            </div>

            <div className='form-group clearfix mb3'>
              <AddChoiceForm
                {...this.props}
                title='Lado A'
                choices={choicesa}
                label={labela}
                handleChangeLabel={label => this.onChangeLabel('labela', label)}
                handleAddItem={choice => this.onAddItem('choicesa', choice)}
                handleRemoveItem={choice => this.onRemoveItem('choicesa', choice)}
                tabindexTitle='2'
                tabindex='4'
                className='pr2'
              />
              {
                !this.state.errors.isEmptySideA ? null : (
                  <span className='red ml2'>{this.state.errors.isEmptySideA}</span>
                )
              }
              <AddChoiceForm {...this.props}
                title='Lado B'
                choices={choicesb}
                label={labelb}
                handleChangeLabel={label => this.onChangeLabel('labelb', label)}
                handleAddItem={choice => this.onAddItem('choicesb', choice)}
                handleRemoveItem={choice => this.onRemoveItem('choicesb', choice)}
                tabindexTitle='3'
                tabindex='5'
              />
              {
                !this.state.errors.isEmptySideB ? null : (
                  <span className='red ml2'>{this.state.errors.isEmptySideB}</span>
                )
              }
            </div>
            <input
              type='submit'
              disabled={this.isDisableButon()}
              className='btn bg-pagenta white caps p2 rounded'
              value='Combinar e Salvar'
            />
          </form>
        </SettingsPageContentLayout>
      </Page>
    )
  }
}

ChoicesPage.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  widgets: PropTypes.array
}

ChoicesPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default ChoicesPage
