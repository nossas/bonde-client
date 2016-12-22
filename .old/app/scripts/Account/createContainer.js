import React, { Component } from 'react'
import { connect } from 'react-redux'


export default config => {
  const {
    fetchData,
    componentDidMount,
    sidebarComponentRender,
    mapStateToProps,
    loginRedirectUrl
  } = config

  class Container extends Component {

    static fetchData(redux) {
      return fetchData && fetchData(redux)
    }

    static onEnter(store) {

      return (nextState, transition) => {
        // Redirect to LOGIN when not user authenticated
        const { auth } = store.getState()
        if (!auth.user && loginRedirectUrl) {
          transition.to(loginRedirectUrl)
        }
      }
    }

    componentDidMount() {
      componentDidMount && componentDidMount(this.props)
    }

    render() {
      const { children, ...receiveProps } = this.props

      return (
        <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
          {sidebarComponentRender && React.cloneElement(sidebarComponentRender, receiveProps)}
          {children && React.cloneElement(children, receiveProps)}
        </div>
      )
    }
  }

  if (mapStateToProps) {
    return connect(mapStateToProps)(Container)
  }

  return Container
}
