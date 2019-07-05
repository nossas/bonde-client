import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'bonde-styleguide'
import Header from './Header'
import Navigation from './Navigation'

const DialogTooltip = ({
  children,
  width,
  minHeight,
  title,
  description,
  currentStep,
  total,
  onNext,
  onClose,
  placement,
  margin
}) => (
  <Tooltip
    onClose={onClose}
    width={width}
    minHeight={minHeight}
    margin={margin}
    Content={() => (
      <Fragment>
        <Header title={title} description={description} />
        <Navigation
          currentStep={currentStep}
          total={total}
          onNext={onNext}
          onClose={onClose}
        />
      </Fragment>
    )}
    placement={placement}
  >
    {children}
  </Tooltip>
)

DialogTooltip.defaultProps = {
  width: 445,
  minHeight: 226
}

DialogTooltip.propTypes = {
  width: PropTypes.number,
  minHeight: PropTypes.number,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // received by context Provider/Consumer
  currentStep: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  placement: PropTypes.string,
  margin: PropTypes.number
}

export default DialogTooltip
