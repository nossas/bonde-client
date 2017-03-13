import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import { PageTabLayout } from '~mobilizations/components'
import { TemplateSelectableList } from '~mobilizations/templates/components'

const TemplatesChooseGlobalPage = ({
  mobilization,
  createMobilizationFromTemplate,
  location,
  ...listableProps
}) => (
  <PageTabLayout {...{ location }}>
    <div className='choose-global-page col-12'>
      <h3 className='h1 mt0 mb3 center'>Meus Templates</h3>
      <TemplateSelectableList
        {...listableProps}
        handleSelectItem={({ id: template_mobilization_id }) => {
          createMobilizationFromTemplate({ id: mobilization.id, template_mobilization_id })
            .then(() => {
              browserHistory.push(paths.editMobilization(mobilization.id))
              return Promise.resolve()
            })
            .catch(error => console.error('CreateMobilizationFromTemplateAsyncError', error))
        }}
      />
    </div>
  </PageTabLayout>
)

export default TemplatesChooseGlobalPage
