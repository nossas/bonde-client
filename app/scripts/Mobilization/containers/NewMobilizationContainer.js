import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { NewMobilizationHeader } from '../components'
import { getMobilization } from '../MobilizationSelectors'

class NewMobilizationContainer extends Component {
  render () {
    const { children, ...rest } = this.props
    return (
      <div className='flex-auto bg-silver gray'>
        <NewMobilizationHeader location={rest.location} />
        {
          React.cloneElement(children, {...rest})
        }
      </div>
    )
  }
}

NewMobilizationContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state, props) => ({
  mobilization: getMobilization(state, props),
  mobilizationTemplates: state.mobilizationTemplates
})

export default connect(mapStateToProps)(NewMobilizationContainer)
