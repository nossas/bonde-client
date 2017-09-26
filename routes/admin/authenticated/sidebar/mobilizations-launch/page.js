import React from 'react'
import { browserHistory } from 'react-router'

import { FormattedMessage, injectIntl } from 'react-intl'
import * as paths from '~client/paths'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { Loading } from '~client/components/await'
import MobSelectors from '~client/mobrender/redux/selectors'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { Button, FlatForm } from '~client/ux/components'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { FormDomain, FormShare } from '~client/mobilizations/components'

if (require('exenv').canUseDOM) {
  require('./form-domain.scss')
  require('./form-share.scss')
}

const FormShareImplementation = injectIntl(FormShare(
  state => ({ initialValues: MobSelectors(state).getMobilization() }),
  { submit: MobActions.asyncUpdateMobilization },
  (values, props) => {
    const errors = {}
    const messageRequired = props.intl.formatMessage({
      id: 'page--mobilizations-launch.form-share.validation.required',
      defaultMessage: 'Obrigatório'
    })

    if (!values.facebook_share_image) {
      errors.facebook_share_image = messageRequired
    }
    if (!values.facebook_share_title) {
      errors.facebook_share_title = messageRequired
    }
    if (!values.facebook_share_description) {
      errors.facebook_share_description = messageRequired
    }
    if (!values.twitter_share_text) {
      errors.twitter_share_text = messageRequired
    }
    return errors
  }
))

const MobilizationsLaunchPage = ({ hostedZones, mobilization, isSaving, ...formProps }) => {
  const stepDomainValidation = () => !!mobilization.custom_domain
  const stepShareValidation = () => (
    !!mobilization.facebook_share_image &&
    !!mobilization.facebook_share_title &&
    !!mobilization.facebook_share_description &&
    !!mobilization.twitter_share_text
  )
  const stepFinishValidation = () => (
    mobilization.custom_domain &&
    mobilization.facebook_share_image &&
    mobilization.facebook_share_title &&
    mobilization.facebook_share_description &&
    mobilization.twitter_share_text
  )

  return (
    <PageCentralizedLayout>
      <PageCentralizedLayoutTitle>
        <FormattedMessage
          id='page--mobilizations-launch.button.launch'
          defaultMessage='Lançando sua mobilização'
        />
      </PageCentralizedLayoutTitle>

      <StepsContainerStack
        ComponentPointerContainer={Tabs}
        ComponentPointerChildren={Tab}
        pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
        progressValidations={[stepDomainValidation, stepShareValidation, stepFinishValidation]}
      >
        <StepContent>
          <FormDomain
            {...formProps}
            formComponent={FlatForm}
            titleText='Configure o endereço da mobilização'
            buttonText={isSaving ? 'Salvando...' : stepShareValidation() ? 'Lançar mobilização' : 'Continuar'}
            requiredField
            mobilization={mobilization}
            hostedZones={hostedZones}
            redirectToCreateDNS={() => {
              browserHistory.push(
                paths.communityDomainCreate(`?next=${paths.mobilizationLaunch(mobilization.id)}`)
              )
            }}
          />
        </StepContent>

        <StepContent>
          <FormShareImplementation
            {...formProps}
            FormComponent={FlatForm}
            formClassNames='mobilization-launch--form-share'
            titleText='Configure as informações de compartilhamento'
            buttonText={isSaving ? 'Salvando...' : 'Lançar mobilização'}
          />
        </StepContent>

        <StepContent>
          <div className='ux--flat-form'>
            <h1>
              <FormattedMessage
                id='page--mobilizations-launch.steps.done.title'
                defaultMessage='Seu BONDE está pronto!'
              />
            </h1>
            <p className='h5'>
              <FormattedMessage
                id='page--mobilizations-launch.steps.done.helper-text'
                defaultMessage='Em uma nova aba, digite o endereço que cadastrou na mobilização para se certificar de que ela já está no ar. Se ainda não estiver, cheque se cadastrou os domínios corretamente. Está tudo certo? Então é só esperar ele propagar pela internet!'
              />
            </p>
            <Button href={`http://${mobilization.custom_domain}`} target='_blank'>
              Visualizar mobilização
            </Button>
          </div>
        </StepContent>
      </StepsContainerStack>

      {isSaving && <Loading />}
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
