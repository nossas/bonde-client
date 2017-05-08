import PropTypes from 'prop-types'
import React from 'react'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

const parseTarget = target => {
  const targetSplit = target.split('<')
  const valid = targetSplit.length === 2
  return valid ? { name: targetSplit[0].trim(), email: targetSplit[1].replace('>', '') } : null
}

const TargetList = ({ targets }) => (
  <div className='target-list px2 py1'>
    <p className='target-list-label bold'>Quem você vai pressionar</p>
    <div className='target-list-container clearfix'>
      <div className='target-list-wrapper clearfix'>
        {targets.length > 0 && targets.map((obj, index) => {
          const target = parseTarget(obj)
          return !target ? null : (
            <div
              key={`target-item-${index}`}
              className='target-item left py1 px2 mr1 bg-white rounded'
            >
              <p className='black h6 m0'>
                <span className='bold flex'>{target.name}</span>
                <span>{target.email}</span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

TargetList.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.string)
}

TargetList.defaultProps = {
  targets: []
}

export default TargetList
