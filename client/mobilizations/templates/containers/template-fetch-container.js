import React, { Component } from 'react'
import { connect } from 'react-redux'

import { asyncFetch } from '../action-creators'
import * as TemplateSelectors from '../selectors'


class TemplateFetchContainer extends Component {

  static getFetchData(store) {
    if (!TemplateSelectors.isLoaded(store.getState())) {
      store.dispatch(asyncFetch())
    }
  }

  componentDidMount() {
    const { isLoaded, asyncFetch } = this.props
    !isLoaded && asyncFetch()
  }

  render() {
    const { children } = this.props

    return (
      <div>
        {children && React.cloneElement(children)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: TemplateSelectors.isLoading(state),
  isLoaded: TemplateSelectors.isLoaded(state)
})

const mapActionCreatorsToProps = { asyncFetch }

export default connect(mapStateToProps, mapActionCreatorsToProps)(TemplateFetchContainer)
