// Provider is responsible to union Dialog components
import React from 'react'
import PropTypes, { oneOfType, func, bool } from 'prop-types'
import Context, { defaultContext } from './Context'
import Dialog from './Dialog'

const initializeCondition = initialize => (
  typeof initialize === 'function'
    ? initialize()
    : initialize
)

class Provider extends React.Component {
  static Dialog = Dialog

  state = {
    ...defaultContext,
    initialize: this.props.initialize
  }

  //
  // Class attribute that stores all childrens keys
  // in rendering runtime, to update Provider state with it.
  //
  registeredStepKeys = []

  componentDidMount () {
    if (initializeCondition(this.props.initialize)) {
      this.setState({ currentStep: 1 })
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.initialize !== state.initialize) {
      const stateChanged = {}

      if (initializeCondition(props.initialize)) {
        stateChanged.currentStep = 1
      } else if (!initializeCondition(props.initialize) && state.currentStep !== 0) {
        stateChanged.currentStep = 0
      }

      return { initialize: props.initialize, ...stateChanged }
    }

    return null
  }

  registerStep (key) {
    if (!this.registeredStepKeys.includes(key)) {
      this.registeredStepKeys.push(key)
      this.setState({ steps: this.registeredStepKeys })
    }
  }

  onNext () {
    const { steps, currentStep } = this.state
    this.setState({
      currentStep: steps.length === currentStep ? 1 : currentStep + 1
    })
  }

  onClose () {
    this.setState({ currentStep: 0 })
    this.props.onClose && this.props.onClose()
  }

  render () {
    const context = {
      registerStep: this.registerStep.bind(this),
      onNext: this.onNext.bind(this),
      onClose: this.onClose.bind(this),
      currentStep: this.state.currentStep,
      total: this.state.steps.length
    }

    return (
      <Context.Provider value={context}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

Provider.defaultProps = {
  initialize: false
}

Provider.propTypes = {
  initialize: oneOfType([
    func,
    bool
  ]),
  onClose: func,
  children: PropTypes.node
}

export default Provider
