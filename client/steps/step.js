import React, { PropTypes } from 'react'

const Step = ({ children, stepComponent: StepComponent, ...props }) => (
  <StepComponent {...props}>
    {children}
  </StepComponent>
)

Step.propTypes = {
  step: PropTypes.number,
  isValid: PropTypes.bool,
  stepComponent: PropTypes.node.isRequired
}

export default Step
