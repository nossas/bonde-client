import React from 'react'
import { Grid, Cell, Backdrop, Loading, Title, Text } from 'bonde-styleguide'

import { translate } from '../../../../services/i18n'
import { withLastLocation } from '../../../../services/router'
import { PageAdmin } from '../../../../components'
import { CommunityList, MobilizationList, TrendingMobs, OnboardingTooltip } from './components'

class Home extends React.Component {
  state = {
    splash: true,
    step: 0,
  }

  handleStep = step => this.setState({ step })
  initOnboarding = () => setTimeout(
    () => {
      const { lastLocation } = this.props
      const isRegisterFlow = lastLocation && lastLocation.pathname === '/admin/tags'
      this.setState({ splash: false, step: Number(isRegisterFlow) });
    }, 3000
  )

  componentDidMount () {
    this.initOnboarding()
  }

  render () {
    const { t } = this.props
    const { splash, step } = this.state

    return (
      <PageAdmin
        Title={({ Default }) => (
          <OnboardingTooltip
            title='Gerencie seu BONDE por aqui'
            subtitle='Aqui em cima você confere em que página está e navega entre as principais sessões das suas comunidades e mobilizações.'
            steps={5}
            handleStep={this.handleStep}
            currentStep={1}
            position={{ left: '330%', top: '-40px' }}
            show={step === 1}
          >
            <Default>{t('title')}</Default>
          </OnboardingTooltip>
        )}
        ActionButtonsWrapper={({ children }) => (
          <OnboardingTooltip
            title='Fique de olho nesse cantinho'
            subtitle='Seu perfil, suas notificações e as principais ações sempre ficam por aqui.'
            steps={5}
            handleStep={this.handleStep}
            currentStep={2}
            placement='bottom-right'
            show={step === 2}
          >
            {children}
          </OnboardingTooltip>
        )}
      >
        {splash && (
          <Backdrop color='rgba(255, 255, 255, .7)'>
            <Text align='center' margin={{ top: '15vh' }}>
              <Loading size={109} />
            </Text>
            <Title.H3 align='center' lineHeight={1.29}>
              Esse BONDE é<br />
              todo seu, Maria.<br />
              Chega mais!
            </Title.H3>
          </Backdrop>
        )}

        <Grid>
          <Cell size={[12, 12, 12, 12, 12, 12]}>
            <Grid>
              <Cell size={[4, 12, 12, 12, 12, 12]}>
                <OnboardingTooltip
                  title='Acesse suas comunidades'
                  subtitle='A comunidade é um grupo que se une por uma causa. A partir dela você pode criar mobilizações e convidar outras pessoas pra chegar junto.'
                  steps={5}
                  handleStep={this.handleStep}
                  currentStep={3}
                  position={{ left: '70%', top: '70px' }}
                  show={step === 3}
                >
                  <CommunityList t={t} />
                </OnboardingTooltip>
              </Cell>
              <Cell size={[8, 12, 12, 12, 12, 12]}>
                <OnboardingTooltip
                  title='Crie mobilizações pra causar'
                  subtitle='É através das mobilizações que você vai gerar um impacto. Aqui você pode ver as mobs das suas comunidades e acessá-las com um clique.'
                  steps={5}
                  handleStep={this.handleStep}
                  currentStep={4}
                  position={{ left: '60%', top: '80px' }}
                  show={step === 4}
                >
                  <MobilizationList t={t} />
                </OnboardingTooltip>
              </Cell>
            </Grid>
          </Cell>
          <Cell size={[12, 12, 12, 12, 12, 12]}>
            <TrendingMobs
              t={t}
              Tooltip={({ children }) => (
                <OnboardingTooltip
                  title='Crie mobilizações pra causar'
                  subtitle='É através das mobilizações que você vai gerar um impacto. Aqui você pode ver as mobs das suas comunidades e acessá-las com um clique.'
                  steps={5}
                  handleStep={this.handleStep}
                  currentStep={5}
                  position={{ left: '50%', top: '-30px' }}
                  show={step === 5}
                >
                  {children}
                </OnboardingTooltip>
              )}
            />
          </Cell>
        </Grid>
      </PageAdmin>
    )
  }
}

export default translate('home')(withLastLocation(Home))
