import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { sanitize } from '../../../../util/string-helper'

import './new-mobilization-header-steps.scss'

const NewMobilizationHeaderSteps = ({ steps }) => (
  <ul className="list-reset m0 lightgray block">
    {steps.map((step, index) => (
      <li
        key={`${sanitize(step.name)}-${index}`}
        className={classnames(
          'inline-block mr2',
          step.active ? 'bold black' : null
        )}
      >
        <i
          className={classnames(
            'circle center inline-block mr2',
            step.active ? 'bg-pagenta' : 'bg-gray94'
          )}
        >
          {index + 1}
        </i>
        {step.name}
      </li>
    ))}
  </ul>
)

NewMobilizationHeaderSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRquired,
    active: PropTypes.bool
  })).isRequired
}

export default NewMobilizationHeaderSteps
