import React from 'react'
import Loadable from 'react-loadable'
import LoadingFullScreen from './LoadingFullScreen'

const LoadingComponent = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>
  } else if (props.pastDelay) {
    return <LoadingFullScreen />
  } else {
    return null
  }
}

export default (opts) => Loadable(Object.assign({
  loading: LoadingComponent
}, opts))
