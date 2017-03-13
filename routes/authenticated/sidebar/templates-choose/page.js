import React from 'react'

import * as paths from '~client/paths'
import { BrowsableList, BrowsableListItem } from '~components/navigation/browsable-list'
import { PageTabLayout } from '~mobilizations/components'

const TemplatesChoosePage = ({
  mobilization,
  templatesGlobalLength,
  templatesCustomLength,
  location
}) => (
  <PageTabLayout {...{ location }}>
    <div className='choose-menu-page col-12'>
      <h3 className='h1 mt0 mb3 center'>Como você deseja começar?</h3>
      <BrowsableList>
        <BrowsableListItem
          leftIcon='plus-square-o'
          title='Criar mobilização do zero'
          path={paths.createBlock(mobilization)}
        />
        <BrowsableListItem
          leftIcon='columns'
          title='Meus templates'
          subtitle={templatesCustomLength}
          path={paths.mobilizationTemplatesChooseCustomList(mobilization)}
        />
        <BrowsableListItem
          leftIcon='globe'
          title='Templates globais'
          subtitle={templatesGlobalLength}
          path={paths.mobilizationTemplatesChooseGlobalList(mobilization)}
        />
      </BrowsableList>
    </div>
  </PageTabLayout>
)

export default TemplatesChoosePage
