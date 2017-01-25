import React, { Component } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { Loading } from '~components/await'
import { Sidebar, getSidebarProps } from '~tmp-dashboard/Sidebar'

// Current module dependencies
import * as MobilizationSelectors from '../selectors'
import { asyncFetch } from '../action-creators'

export class MobilizationDashboardContainer extends Component {
  static fetchData (store) {
    const promises = []
    if (!MobilizationSelectors.isLoaded(store.getState())) {
      const { community: { currentId } } = store.getState()
      promises.push(store.dispatch(asyncFetch(currentId)))
    }
    return Promise.all(promises)
  }

  componentDidMount () {
    const { asyncFetch, relationshipId } = this.props
    asyncFetch(relationshipId)
  }

  render () {
    const { children, loading, sidebarProps } = this.props

    if (loading) return <Loading />

    return (
      <Sidebar {...sidebarProps}>
        {children && React.cloneElement(children)}
      </Sidebar>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { loading } = state.mobilization
  const { currentId } = state.community

  return {
    loading,
    relationshipId: currentId,
    sidebarProps: getSidebarProps(state, ownProps)
  }
}

const mapActionCreatorsToProps = { asyncFetch }

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationDashboardContainer)
