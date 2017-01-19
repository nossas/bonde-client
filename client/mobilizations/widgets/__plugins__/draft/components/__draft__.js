import React, { PropTypes, Component } from 'react'

// Global module dependencies
import { createEditorContent } from '../../../../../scripts/RebooEditor'
import { Loading } from '../../../../../scripts/components'

// Parent module dependencies
import { actions as WidgetActions } from '../../../../../modules/widgets'

// Current module dependencies
import { DraftWidgetButton } from '../components'

import './__draft__.scss'

export class Draft extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  updateKind (kind) {
    const { dispatch, widget: widgetOriginal } = this.props
    let widget = { ...widgetOriginal, kind }
    let assignments = {}

    if (kind === 'form') {
      assignments = { settings: { email_text: 'Obrigado por apostar na força da ação coletiva em' +
        ' rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que' +
        ' mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um' +
        ' dos links abaixo.\n\nUm abraço'
      } }
    }

    if (kind === 'content') {
      assignments = { settings: { content: createEditorContent('Clique aqui para editar...') } }
    }

    if (kind === 'match') {
      assignments = { settings: { title_text: 'Clique para configurar suas combinações...' } }
    }

    if (kind === 'pressure') {
      const { auth: { user } } = this.props
      assignments = {
        settings: {
          main_color: '#f23392',
          title_text: 'Envie um e-mail para quem pode tomar essa decisão',
          button_text: 'Enviar e-mail',
          reply_email: user.email
        }
      }
    }
    Object.assign(widget, assignments)
    this.setState({ loading: true })
    dispatch(WidgetActions.asyncWidgetUpdate(widget))
  }

  render () {
    const { loading } = this.state
    const { editable } = this.props
    const updateContent = () => this.updateKind('content')
    const updateForm = () => this.updateKind('form')
    const updateDonation = () => this.updateKind('donation')
    const updateMatch = () => this.updateKind('match')
    const updatePressure = () => this.updateKind('pressure')

    return loading ? <Loading /> : (!editable ? null : (
      <div className='draft-widget widget center rounded lightgray clearfix'>
        <div className='title'>Escolha um tipo de widget</div>

        <DraftWidgetButton onClick={updateContent} icon='font' label='Texto' />
        <DraftWidgetButton onClick={updateForm} icon='list' label='Formulário' />
        <DraftWidgetButton onClick={updateDonation} icon='money' label='Doação' />
        <DraftWidgetButton onClick={updateMatch} icon='compress' label='Match' />
        <DraftWidgetButton onClick={updatePressure} icon='bullseye' label='Pressão' />
      </div>
    ))
  }
}

Draft.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Draft
