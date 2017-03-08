import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import { PageCentralizedStepsLayout, FormCustomDomain } from '~mobilizations/components'
import { Button, FormError } from '~components/forms'

const MobilizationsSettingsDomainPage = props => {
  const { location, mobilization, fields, submit, ...formProps } = props

  return (
    <PageCentralizedStepsLayout
      {...{ mobilization, location }}
      title='Lançando sua Mobilização'
    >
      <FormCustomDomain
        {...{ mobilization, fields, ...formProps }}
        formReduxClassName='bg-white rounded left-align'
        helperTextClassName='mx3'
        title='Configura o domínio'
        submit={values => submit({
          ...values,
          next: browserHistory.push(paths.editMobilization(mobilization.id))
        })}
      >
        <Button type='submit' className='btn bg-blacker white col-12 rounded-bottom py2 caps mt3'>
          {formProps.submitting ? 'Salvando...' : 'Lançar mobilização'}
        </Button>
        <FormError className='mt2' />
      </FormCustomDomain>
    </PageCentralizedStepsLayout>
  )
}

export default MobilizationsSettingsDomainPage
