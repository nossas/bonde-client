import React from 'react'
import { connect } from 'services/redux'
import * as actions from '../redux/actions'
import Box from './Box'
import PropTypes from 'prop-types'

class BoxConnected extends React.Component {
  componentDidMount () {
    this.props.registerStep()
  }

  render () {
    return this.props.showTooltip ? (
      <Box
        title={this.props.title}
        subtitle={this.props.description}
        currentStep={this.props.step}
        total={this.props.total}
        onNext={this.props.onNext}
        onClose={this.props.onClose}
        placement={this.props.placement}
      >
        {this.props.children}
      </Box>
    ) : this.props.children
  }
}

BoxConnected.propTypes = {
  registerStep: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  step: PropTypes.number,
  total: PropTypes.number,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  placement: PropTypes.string,
  children: PropTypes.node,
  showTooltip: PropTypes.bool
}

const mapStateToProps = (state, { tourName, step }) => {
  const tourState = state[tourName]

  return {
    total: tourState.total,
    showTooltip: tourState.show && tourState.currentStep === step
  }
}

const mapDispatchToProps = {
  onNext: actions.onNext,
  onClose: actions.onFinish,
  registerStep: actions.register
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxConnected)
