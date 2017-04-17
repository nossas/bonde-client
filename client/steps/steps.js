import React, { Component, PropTypes } from 'react'

class Steps extends Component {

  constructor (props) {
    super(props)
    this.state = { current: 1 }
  }

  refreshStepsProgress (props) {
    const { progressValidations: validations } = props
    //
    // Check if the childrens validation pass.
    // If it pass, jump to the next step.
    // If not, define it as current.
    //
    validations && validations.length && validations.map((validate, index) => {
      const position = index + 1
      const isCurrent = this.state.current === position
      if (isCurrent && (this.state.current <= validations.length) && validate()) {
        this.setState({ current: this.state.current + 1 })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.refreshStepsProgress(nextProps)
  }

  componentWillMount () {
    this.refreshStepsProgress(this.props)
  }

  render () {
    const { children, className, renderRule } = this.props

    const steps = children && children.length === 1 ? [children, ] : children

    return (
      <div className={`steps ${className}`}>
        {steps && steps.map((stepComponent, index) => {
          const position = index + 1
          if (renderRule(position, this.state.current)) {
            return React.cloneElement(stepComponent, {
              key: `step-${position}`,
              step: position,
              isValid: position < this.state.current
            })
          }
        })}
      </div>
    )
  }
}

Steps.propTypes = {
  progressValidations: PropTypes.array,
  renderRule: PropTypes.func
}

export default Steps
