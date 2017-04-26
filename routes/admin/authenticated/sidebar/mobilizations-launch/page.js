import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { Loading } from '~client/components/await'
import MobSelectors from '~client/mobrender/redux/selectors'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { FlatForm } from '~client/ux/components'
import { isValidDomain } from '~client/utils/validation-helper'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { Button } from '~client/ux/components'
import { FormDomain, FormShare } from '~client/mobilizations/components'

if (require('exenv').canUseDOM) {
  require('./form-share.scss')
}

const FormShareImplementation = FormShare(
  state => ({ initialValues: MobSelectors(state).getMobilization() }),
  { submit: MobActions.asyncUpdateMobilization },
  values => {
    const errors = {}
    if (!values.facebook_share_image) {
      errors.facebook_share_image = 'Obrigatório'
    }
    if (!values.facebook_share_title) {
      errors.facebook_share_title = 'Obrigatório'
    }
    if (!values.facebook_share_description) {
      errors.facebook_share_description = 'Obrigatório'
    }
    if (!values.twitter_share_text) {
      errors.twitter_share_text = 'Obrigatório'
    }
    return errors
  }
)

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
        Lançando sua mobilização
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
            requiredField={true}
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
            <h1>Seu BONDE está pronto!</h1>
            <p className='h5'>
            Em uma nova aba, digite o endereço que cadastrou na mobilização
            para se certificar de que ela já está no ar. Se ainda não estiver,
            cheque se cadastrou os domínios corretamente. Está tudo certo? Então
            é só esperar ele propagar pela internet!
            </p>
            <Button href={`http://${mobilization.custom_domain}`} target='_blank'>Visualizar mobilização</Button>
          </div>
        </StepContent>
      </StepsContainerStack>

      {isSaving && <Loading />}
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
