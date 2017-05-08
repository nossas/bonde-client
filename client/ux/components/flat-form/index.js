import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames'

import { FormRedux } from '~client/components/forms'
import { Button } from '~client/ux/components'

if (require('exenv').canUseDOM) {
  require('./flat-form.scss')
  require('./button.scss')
}

const FlatForm = ({
  formClassNames,
  children,
  titleText,
  titleSmallMargin,
  titleMediumMargin,
  titleBigMargin,
  buttonText,
  ...formProps
}) => (
  <FormRedux
    {...formProps}
    nosubmit
    className={classnames('ux--flat-form', formClassNames)}
  >
    {titleText && (
      <h1 className={classnames({
        'sm-margin': titleSmallMargin,
        'md-margin': titleMediumMargin,
        'lg-margin': titleBigMargin
      })}>
        {titleText}
      </h1>
    )}
    {children}
    <Button type='submit'>{buttonText}</Button>
  </FormRedux>
)

FlatForm.propTypes = {
  formClassNames: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  titleText: PropTypes.string,
  titleSmallMargin: PropTypes.bool,
  titleMediumMargin: PropTypes.bool,
  titleBigMargin: PropTypes.bool
}

export default FlatForm
