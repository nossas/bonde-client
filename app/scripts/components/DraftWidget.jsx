import React, { PropTypes } from 'react'
import { Loading } from './'
import { bindActionCreators } from 'redux'
import * as WidgetActions from './../actions/WidgetActions'

export default class DraftWidget extends React.Component {
  static propTypes = {
    dispatch     : PropTypes.func.isRequired,
    auth         : PropTypes.object.isRequired,
    mobilization : PropTypes.object.isRequired,
    widget       : PropTypes.object.isRequired,
    editable     : PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  handleContentClick(event) {
    event.preventDefault()
    this.updateKind('content')
  }

  handleFormClick(event) {
    event.preventDefault()
    this.updateKind('form')
  }

  handleDonationClick(event) {
    event.preventDefault()
    this.updateKind('donation')
  }

  updateKind(kind) {
    const { dispatch, auth } = this.props
    const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
    let widgetParams = { kind }

    if (kind === 'form') {
      widgetParams = {
        ...widgetParams,
        settings: {email_text: 'Obrigado por apostar na força da ação coletiva '
          + 'em rede. Sua participação é muito importante e, agora, precisamos da '
          + 'sua ajuda para que mais gente colabore com esta mobilização. '
          + 'Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço'
        }
      }
    }

    if (kind === 'content') {
      widgetParams = {
        ...widgetParams,
        settings: {content: 'Clique aqui para editar...'}
      }
    }

    this.setState({loading: true})
    // TODO: change it to use the new pattern for reducer actions
    bindedWidgetActions.editWidget({
      mobilization_id: this.props.mobilization.id,
      widget_id: this.props.widget.id,
      widget: widgetParams,
      credentials: auth.credentials
    })
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  renderDraft() {
    if (this.props.editable) {
      return (
        <div className="widget border center p2" style={{borderStyle: 'dashed'}}>
          <h4>Escolha uma das opções abaixo</h4>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-content"
            onClick={::this.handleContentClick}>
            Texto
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-form"
            onClick={::this.handleFormClick}>
            Formulário
          </button>
          <button
            className="caps button bg-darken-4 mt1 p2 full-width btn-donation"
            onClick={::this.handleDonationClick}>
            Doação
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderDraft()}
        {this.renderLoading()}
      </div>
    )
  }
}
