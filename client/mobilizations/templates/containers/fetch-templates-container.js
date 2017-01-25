import React, { Component } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { Loading } from '~components/await'

// Current module dependencies
import { asyncFetch } from '../action-creators'
import * as TemplateSelectors from '../selectors'

class FetchTemplatesContainer extends Component {
  static getFetchData (store) {
    if (!TemplateSelectors.isLoaded(store.getState())) {
      store.dispatch(asyncFetch())
    }
  }

  componentDidMount () {
    const { isLoaded, asyncFetch } = this.props
    !isLoaded && asyncFetch()
  }

  render () {
    const { children, loading } = this.props

    if (loading) return <Loading />

    return (
      <div className='flex flex-auto'>
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(FetchTemplatesContainer)
