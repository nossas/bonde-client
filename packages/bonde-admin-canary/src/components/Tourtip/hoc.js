/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { connect } from 'services/redux'
import * as actions from './redux/actions'

const mapDispatchToProps = { initializeTour: actions.onStart }

const hoc = ({ init } = {}) => Component => connect(undefined, mapDispatchToProps)(

  class extends React.Component {
    componentDidMount () {
      if (typeof init === 'function' && init(this.props)) {
        this.props.initializeTour()
      } else if (typeof init === 'boolean' && init) {
        this.props.initializeTour()
      }
    }

    componentDidUpdate () {
      if (typeof init === 'function' && init(this.props)) {
        this.props.initializeTour()
      } else if (typeof init === 'boolean' && init) {
        this.props.initializeTour()
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }
)

export default hoc
