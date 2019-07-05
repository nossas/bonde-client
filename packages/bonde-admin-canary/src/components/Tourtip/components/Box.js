import React, { Fragment } from 'react'
import PropTypes, { node, number, string, func } from 'prop-types'
import {
  Button,
  Flexbox2 as Flexbox,
  Tooltip,
  Title,
  Text
} from 'bonde-styleguide'

const Navigation = ({ onNext, onClose, currentStep, total }) => (
  <Flexbox horizontal middle>
    <Title.H5 color='#fff'>{currentStep} / {total}</Title.H5>
    {currentStep < total && (
      <Fragment>
        <Button dark flat onClick={onClose}>
          Pular tour
        </Button>
        <Button dark onClick={onNext}>
          Próxima parada
        </Button>
      </Fragment>
    )}
    {currentStep >= total && (
      <Fragment>
        <Button dark flat onClick={onNext}>
          Rever Tour
        </Button>
        <Button dark onClick={onClose}>
          Finalizar Tour
        </Button>
      </Fragment>
    )}
  </Flexbox>
)

Navigation.propTypes = {
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  currentStep: PropTypes.number,
  total: PropTypes.number
}

const Header = ({ title, subtitle }) => (
  <Fragment>
    {title && (
      <Title.H3
        color='#fff'
        margin={{ bottom: 25 }}
      >
        {title}
      </Title.H3>
    )}
    {subtitle && (
      <Text
        color='#fff'
        margin={{ bottom: 20 }}
      >
        {subtitle}
      </Text>
    )}
  </Fragment>
)

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

const Box = ({
  children,
  width,
  minHeight,
  title,
  subtitle,
  currentStep,
  total,
  onNext,
  onClose,
  placement
}) => (
  <Tooltip
    onClose={onClose}
    width={width}
    minHeight={minHeight}
    Content={() => (
      <Fragment>
        <Header
          title={title}
          subtitle={subtitle}
        />
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

Box.defaultProps = {
  width: 445,
  minHeight: 226
}

Box.propTypes = {
  children: node.isRequired,
  width: number,
  minHeight: number,
  title: string.isRequired,
  subtitle: string.isRequired,
  currentStep: string.isRequired,
  total: string.isRequired,
  onNext: func.isRequired,
  onClose: func.isRequired,
  placement: string.isRequired
}

export default Box
