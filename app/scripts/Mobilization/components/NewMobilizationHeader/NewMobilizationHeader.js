import React, { PropTypes } from 'react'
import classnames from 'classnames'

import * as Paths from '../../../Paths'
import { NewMobilizationHeaderSteps } from './'

import './new-mobilization-header.scss'

const NewMobilizationHeader = ({ location }) => (
  <div className='new-mobilization-header bg-white px5 pt3 pb1 clearfix'>
    <h1 className='h1 mt0'>Nova mobilização</h1>
    <NewMobilizationHeaderSteps
      steps={[
        { name: 'Objetivo', active: location && location.pathname === Paths.newMobilization() },
        { name: 'Templates', active: location && /\/\w+\/[0-9]+\/templates\/choose/.test(location.pathname) }
      ]}
    />
  </div>
)

NewMobilizationHeader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default NewMobilizationHeader
