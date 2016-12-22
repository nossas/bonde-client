import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu as MobilizationSettingsMenu } from '../components/settings'
import { getMobilization } from '../MobilizationSelectors'
import { SettingsPageLayout } from '../../../components/Layout'

// You may will see the warning below:
// Warning: Stateless function components cannot be given refs (See ref "wrappedInstance" in
// MobilizationSettingsContainer created by Connect(MobilizationSettingsContainer)). Attempts to
// access this ref will fail.
//
// Upgrade React Redux to version 4 will should go away this warning.
// See: https://github.com/reactjs/react-redux/issues/141#issuecomment-148358733

export const MobilizationSettingsContainer = ({ children, ...props }) => (
  <SettingsPageLayout>
    <MobilizationSettingsMenu {...props} />
    {React.cloneElement(children, {...props})}
  </SettingsPageLayout>
)

MobilizationSettingsContainer.propTypes = {
  mobilization: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  mobilization: getMobilization(state, props)
})

export default connect(mapStateToProps)(MobilizationSettingsContainer)
