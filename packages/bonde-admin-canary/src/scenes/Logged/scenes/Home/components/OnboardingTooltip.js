import React from 'react'
import { Tooltip, Title, Text, Flexbox, Button } from 'bonde-styleguide'

const OnboardingTooltip = ({
  children,
  title,
  subtitle,
  steps,
  currentStep,
  handleStep,
  ...props
}) => (
  <Tooltip
    onClose={() => handleStep(0)}
    minWidth={445}
    minHeight={226}
    Content={() => (
      <React.Fragment>
        <Title.H3 color='#FFFFFF' margin={{ bottom: 25 }}>
          {title}
        </Title.H3>
        <Text color='#FFFFFF' margin={{ bottom: 20 }}>
          {subtitle}
        </Text>
        <Flexbox horizontal alignItems='middle'>
          <Title.H5 color='#FFFFFF'>
            {currentStep} / {steps}
          </Title.H5>

          {currentStep < steps && (
            <React.Fragment>
              <Button dark flat onClick={() => handleStep(0)}>
                Pular Tour
              </Button>
              <Button dark onClick={() => handleStep(currentStep + 1)}>
                Próxima Parada
              </Button>
            </React.Fragment>
          )}
          {currentStep >= steps && (
            <React.Fragment>
              <Button dark flat onClick={() => handleStep(1)}>
                Rever Tour
              </Button>
              <Button dark onClick={() => handleStep(0)}>
                Finalizar Tour
              </Button>
            </React.Fragment>
          )}
        </Flexbox>
      </React.Fragment>
    )}
    {...props}
  >
    {children}
  </Tooltip>
)

OnboardingTooltip.displayName = 'OnboardingTooltip'

export default OnboardingTooltip
