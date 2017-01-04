import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
import classnames from 'classnames'

import { WYSIHTMLToolbar, Loading } from '../../../components'
import * as WidgetActions from '../../actions'

export default class OldEditorContentWidget extends React.Component {

  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      editor: null,
      content: props.widget.settings.content,
      toolbarId: 'wysihtml5-toolbar-' + this.props.widget.id,
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.editable) {
      const editor = new wysihtml5.Editor(
        this.refs.content, {
          toolbar: this.state.toolbarId,
          parserRules: wysihtml5ParserRules
        }
      ).on('focus', ::this.handleEditorFocus)
      this.setState({editor: editor})
    } else {
      this.setClick()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && this.props.widget.settings.content !== nextProps.widget.settings.content) {
      this.setState({loading: false})
    }
  }

  enableEditor() {
    this.setState({editing: true})
    this.props.onEdit && this.props.onEdit()
    window.addEventListener('keyup', ::this.handleEscapePress)
  }

  disableEditor() {
    this.setState({editing: false})
    this.props.onCancelEdit && this.props.onCancelEdit()
    window.removeEventListener('keyup', ::this.handleEscapePress)
    this.refs.content.blur()
  }

  handleEditorFocus() {
    this.enableEditor()
  }

  handleEscapePress(e) {
    if (e.keyCode === 27) {
      this.save()
    }
  }

  handleOverlayClick() {
    this.save()
  }

  setClick() {
    const links = document.querySelectorAll('.content-widget a:not([target="_blank"])')
    for (let link of links) {
      $(link).on('click touchstart', ::this.handleClick)
    }
  }

  handleClick(e) {
    e.preventDefault()
    const target = $(e.target).closest("a").prop("hash")
    const scrollable = $('#blocks-list')
    const yPosition = $(target).offset().top + scrollable.scrollTop() - scrollable.position().top

    scrollable.stop().animate({scrollTop: yPosition}, 500, () => {
      window.location.hash = target
    })
  }

  save() {
    const { editor, content } = this.state
    const hasChanged = editor.getValue() !== content
    this.setState({content: editor.getValue()})
    this.disableEditor()

    if (hasChanged) {
      const { dispatch, widget, mobilization, auth: { credentials } } = this.props
      const bindedWidgetActions = bindActionCreators(WidgetActions, dispatch)
      this.setState({loading: true})

      const data = { ...widget, settings: { content: this.state.editor.getValue() } }
      bindedWidgetActions.editWidgetAsync(data)
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  handleRenderNewEditor() {
    const { handleForceRender } = this.props
    if (window.confirm(`Ao converter seu conteúdo para o novo editor
      algumas informações podem ser perdidas,
      tem certeza que você quer alterar para o novo editor?`)) {
      handleForceRender()
    }
  }

  render() {
    const { toolbarId, editing } = this.state
    const { mobilization: { header_font: headerFont, body_font: bodyFont } } = this.props
    const { handleForceRender } = this.props
    return (
      <div>
        <div className={classnames('content-widget col-12', {'display-none': !editing})}>
          <WYSIHTMLToolbar
            elementId={toolbarId}
            className="absolute col-12 top-0 bg-darken-4 z7"
            buttonClassName="btn white p2"
            style={{ left: '80px' }}
          />
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z5"
            onClick={::this.handleOverlayClick}
          />
        </div>
        <div className={classnames('link relative', editing ? 'z6' : 'z0')}>
          <div
            className={classnames('widget', `${headerFont}-header`, `${bodyFont}-body`)}
            dangerouslySetInnerHTML={{__html: this.state.content}}
            ref="content"
          />
          <div className={classnames('right mt1', {'display-none': !editing})}>
            {handleForceRender ? (
              <button
                onClick={this.handleRenderNewEditor.bind(this)}
                className="btn caps bg-darken-4 white rounded mr1"
              >
                Alterar editor
              </button>
            ) : null}
            <button
              onClick={::this.save}
              className="btn caps bg-darken-4 white rounded"
            >
              Salvar
            </button>
          </div>
        </div>
        {this.renderLoading()}
      </div>
    )
  }
}
