import React, { PropTypes } from 'react'
import classnames from 'classnames'

const SettingsPageContentLayout = ({ children, className, containerClassName, wrapClassName }) => (
  <div
    className={classnames(
      'settings-page-content-layout clearfix overflow-auto py3 pr4 pl3',
      className
    )}
  >
    <div
      className={classnames(
        'clearfix',
        containerClassName,
        wrapClassName || 'md-col-12 lg-col-9'
      )}
    >
      {children}
    </div>
  </div>
)

SettingsPageContentLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  containerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  wrapClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default SettingsPageContentLayout
