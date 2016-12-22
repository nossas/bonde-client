import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { setToolbarLinkOpenStrategy } from '../Widget/actions'

// You may will see the warning below:
// Warning: Stateless function components cannot be given refs (See ref "wrappedInstance" in
// MobilizationSettingsContainer created by Connect(MobilizationSettingsContainer)). Attempts to
// access this ref will fail.
//
// Upgrade React Redux to version 4 will should go away this warning.
// See: https://github.com/reactjs/react-redux/issues/141#issuecomment-148358733

const WYSIHTMLToolbarCreateLink = ({ dispatch, toolbarLinkOpenStrategy }) => (
  <div
    data-wysihtml5-dialog="createLink"
    className="white p2 bg-darken-3"
    style={{ display: 'none' }}
  >
    <input
      type="text"
      data-wysihtml5-dialog-field="href"
      defaultValue="http://"
      className="input mr1"
    />
    <a data-wysihtml5-dialog-action="save" className="btn btn-outline">
      Inserir
    </a>
    <span className="ml2">
      <input
        type="checkbox"
        name="toolbarLinkOpenStrategy"
        onChange={e => dispatch(setToolbarLinkOpenStrategy(e.target.checked ? '_blank' : '_self'))}
        value={toolbarLinkOpenStrategy}
        data-wysihtml5-dialog-field="target"
      />
      <label htmlFor="toolbarLinkOpenStrategy">
        Abrir link em nova aba
      </label>
    </span>
  </div>
)

WYSIHTMLToolbarCreateLink.propTypes = {
  toolbarLinkOpenStrategy: PropTypes.string.isRequired
}

WYSIHTMLToolbarCreateLink.defaultProps = {
  toolbarLinkOpenStrategy: '_self'
}

const mapStateToProps = state => ({
  toolbarLinkOpenStrategy: state.widgets.toolbarLinkOpenStrategy
})

export default connect(mapStateToProps)(WYSIHTMLToolbarCreateLink)
