import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as MobilizationTemplatesActions from '../MobilizationTemplatesActions'
import { getMobilization } from '../../../MobilizationSelectors'

class MobilizationTemplatesContainer extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }

  componentDidMount() {
    const { fetchTemplatesAsync, loaded } = this.props
    // TODO this callback is a workaround to load data in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // data only in the server-side for now
    !loaded && fetchTemplatesAsync()
  }

  render() {
    const { children, ...rest } = this.props
    return <div>{React.cloneElement(children, {...rest})}</div>
  }
}

const mapStateToProps = (state, props) => ({
  mobilization: getMobilization(state, props),
  mobilizationTemplates: state.mobilizationTemplates,
  loaded: state.mobilizationTemplates.loaded,
  loading: state.mobilizationTemplates.loading,
})

export default connect(
  mapStateToProps,
  MobilizationTemplatesActions
)(MobilizationTemplatesContainer)
