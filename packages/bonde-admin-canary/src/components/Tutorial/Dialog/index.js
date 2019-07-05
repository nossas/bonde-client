import React from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'
import DialogTooltip from './DialogTooltip'

export class RegisterDialog extends React.Component {
  componentDidMount () {
    const { name, context } = this.props
    context.registerStep(name)
  }

  render () {
    const { context, ...props } = this.props

    return context.currentStep === props.step ? (
      <DialogTooltip
        total={context.total}
        currentStep={context.currentStep}
        onNext={context.onNext}
        onClose={context.onClose}
        {...props}
      />
    ) : props.children
  }
}

RegisterDialog.propTypes = {
  name: PropTypes.string,
  context: PropTypes.shape({
    total: PropTypes.number,
    onNext: PropTypes.func,
    onClose: PropTypes.onClose,
    currentStep: PropTypes.number,
    step: PropTypes.number,
    registerStep: PropTypes.func
  })
}

const Dialog = (props) => (
  <Context.Consumer>
    {context => <RegisterDialog context={context} {...props} />}
  </Context.Consumer>
)

Dialog.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
}

export default Dialog
