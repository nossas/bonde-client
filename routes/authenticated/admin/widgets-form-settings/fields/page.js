import React, { Component, PropTypes } from 'react'

import { Loading } from '~components/await'
import Form from '~widget-plugins/form/components'

class FormSettingsFieldsPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = { loading: false, hasNewField: false }
  }

  componentWillReceiveProps (nextProps) {
    const { widget } = this.props
    if (this.state.loading && widget !== nextProps.widget) {
      this.setState({ loading: false, hasNewField: true })
    } else {
      this.setState({ hasNewField: false })
    }
  }

  handleAddTextField () {
    this.addField('text')
  }

  fields () {
    const { widget: { settings } } = this.props
    return (settings && settings.fields ? settings.fields : [])
  }

  addField (kind) {
    const { widget, asyncWidgetUpdate } = this.props
    const { settings } = widget
    const fields = this.fields()

    this.setState({ loading: true })
    asyncWidgetUpdate({
      ...widget,
      settings: {
        ...settings,
        fields: [
          ...fields,
          {
            uid: `field-${Date.now().toString()}-${Math.floor((Math.random() * 100) + 1)}`,
            kind: 'text',
            label: '',
            placeholder: '',
            required: 'false'
          }
        ]
      }
    })
  }

  renderFields () {
    const { widget, ...props } = this.props
    return (
      <div>
        <button
          className='btn white bg-pagenta caps p2 rounded'
          onClick={::this.handleAddTextField}
          style={{
            position: 'fixed',
            top: '2rem',
            right: '4rem',
            width: 'inherit',
            textTransform: 'uppercase',
            margin: '0',
            fontSize: '1.1rem',
            padding: '.7rem 1.6rem'
          }}
        >
          Adicionar um campo
        </button>

        <p className='h5 mb3 darkengray'>
          {
            ~this.fields().length
              ? 'Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a' +
                ' adicionar campos.'
              : 'Adicione, remova, edite e ordene os campos do formulário de acordo com as' +
                ' necessidades da sua ação.'
          }
        </p>

        <Form
          {...props}
          widget={widget}
          configurable
          hasNewField={this.state.hasNewField}
        />
        {this.renderLoading()}
      </div>
    )
  }

  renderLoading () {
    const { loading } = this.state
    const { widget } = this.props
    return loading || widget === undefined ? <Loading /> : null
  }

  render () {
    const { widget } = this.props
    return (widget !== undefined ? this.renderFields() : this.renderLoading())
  }
}

FormSettingsFieldsPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default FormSettingsFieldsPage
