import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import Editor from '../../../../../scripts/RebooEditor'

// Parent module dependencies
import { WidgetOverlay, FinishMessageCustom } from '../../../../../modules/widgets/components'

// Current module dependencies
import {
  PressureCount,
  PressureForm,
  TargetList,
  PressureTellAFriend
} from '../components'
import * as PressureActions from '../action-creators'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
export class Pressure extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filled: false }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filled: this.props.saving && !nextProps.saving })
  }

  getTargetList() {
    const { targets } = this.props.widget.settings || { targets: '' }
    return targets && targets.split(';').filter(target => !!target.trim())
  }

  getEmailTarget(target) {
    const targetSplit = target.split('<')
    return targetSplit[1].replace('>', '')
  }

  handleSubmit(data) {
    const { widget, asyncFillWidget } = this.props
    const payload = {
      activist: {
        firstname: data.name,
        lastname: data.lastname,
        email: data.email,
        city: !!data.city ? data.city : null
      },
      mail: {
        cc: this.getTargetList().map(target => this.getEmailTarget(target)),
        subject: data.subject,
        body: data.body
      }
    }
    asyncFillWidget({ payload, widget })
  }

  handleOverlayOnClick(e) {
    const { mobilization, widget, editable } = this.props
    if (editable) {
      if (e) e.preventDefault()
      this.context.router.transitionTo(
        Paths.formPressureWidget(mobilization.id, widget.id)
      )
    }
  }

  render() {
    const {
      widget,
      editable,
      saving,
      filled,
      mobilization
    } = this.props
    const { header_font: headerFont } = mobilization
    const {
      main_color,
      title_text,
      button_text,
      reply_email,
      show_counter,
      count_text,
      pressure_subject,
      pressure_body,
      finish_message_type,
      finish_message,
      finish_message_background
    } = widget.settings || {
      main_color: '#f23392',
      title_text: 'Envie um e-mail para quem pode tomar essa decisão',
      button_text: 'Enviar e-mail'
    }

    return (
      <WidgetOverlay
        editable={editable}
        onClick={::this.handleOverlayOnClick}
        text="Clique para configurar o formulário de pressão direta"
      >
        {filled ? (
          finish_message_type === 'custom' ? (
            <FinishMessageCustom widget={widget} />
          ) : (
            <PressureTellAFriend mobilization={mobilization} />
          )
        ) : (
          <div className="pressure-widget">
            <h2
              className="center py2 px3 m0 white rounded-top"
              style={{ backgroundColor: main_color, fontFamily: headerFont }}
            >
              {title_text}
            </h2>
            <TargetList targets={::this.getTargetList() || []} />
            <PressureForm
              widget={widget}
              buttonText={(saving && !editable ? 'Enviando...' : button_text)}
              buttonColor={main_color}
              subject={pressure_subject}
              body={pressure_body}
              onSubmit={::this.handleSubmit}
            >
              {!show_counter || show_counter !== 'true' ? null : (
                <PressureCount
                  value={widget.count || 0}
                  color={main_color}
                  text={count_text}
                />
              )}
            </PressureForm>
          </div>
        )}
      </WidgetOverlay>
    )
  }
}

Pressure.propTypes = {
  editable: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.shape({
    settings: PropTypes.shape({
      finish_message_type: PropTypes.string,
      finish_message: PropTypes.string,
      finish_message_background: PropTypes.string
    }).isRequired
  }).isRequired,
  saving: PropTypes.bool,
  filled: PropTypes.bool,
  // Actions
  asyncFillWidget: PropTypes.func
}

Pressure.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = ({ widgets: { plugins: { pressure } } }) => ({
  saving: pressure.saving,
  filled: pressure.filled
})

export default connect(mapStateToProps, PressureActions)(Pressure)
