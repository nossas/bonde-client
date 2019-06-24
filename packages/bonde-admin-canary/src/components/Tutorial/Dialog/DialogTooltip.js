import React, { Fragment } from 'react'
import { string, number } from 'prop-types'
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
  title: string.isRequired,
  description: string.isRequired,
  // received by context Provider/Consumer
  currentStep: number.isRequired,
  total: number.isRequired
}

export default DialogTooltip
