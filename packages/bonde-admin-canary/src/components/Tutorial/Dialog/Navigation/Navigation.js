import React, { Fragment } from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Title
} from 'bonde-styleguide'
import PropTypes from 'prop-types'

const Navigation = ({ t, onNext, onClose, currentStep, total }) => (
  <Flexbox horizontal middle>
    <Title.H5 color='#fff'>{currentStep} / {total}</Title.H5>
    {currentStep < total && (
      <Fragment>
        <Button dark flat onClick={onClose}>
          {t('tutorial.skip')}
        </Button>
        <Button dark onClick={onNext}>
          {t('tutorial.next')}
        </Button>
      </Fragment>
    )}
    {currentStep >= total && (
      <Fragment>
        <Button dark flat onClick={onNext}>
          {t('tutorial.restart')}
        </Button>
        <Button dark onClick={onClose}>
          {t('tutorial.finish')}
        </Button>
      </Fragment>
    )}
  </Flexbox>
)

Navigation.propTypes = {
  t: PropTypes.func,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  currentStep: PropTypes.number,
  total: PropTypes.number
}

export default Navigation
