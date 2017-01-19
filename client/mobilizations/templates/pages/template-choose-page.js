import React from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import * as Paths from '../../../../scripts/Paths'
import { BrowsableList, BrowsableListItem } from '../../../../components/Navigation/BrowsableList'

// Parent module dependencies
import * as MobilizationSelectors from '../../selectors'

// Sibling module dependencies
import { paths as BlockPaths } from '../../blocks'

// Current module dependencies
import * as TemplateSelectors from '../selectors'

const TemplateChoosePage = ({ mobilization, templatesGlobalLength, templatesCustomLength }) => (
  <div className='choose-menu-page col-12'>
    <h3 className='h1 mt0 mb3 center'>Como você deseja começar?</h3>
    <BrowsableList>
      <BrowsableListItem
        leftIcon='plus-square-o'
        title='Criar mobilização do zero'
        path={BlockPaths.createBlock(mobilization)}
      />
      <BrowsableListItem
        leftIcon='columns'
        title='Meus templates'
        subtitle={templatesCustomLength}
        path={Paths.mobilizationTemplatesChooseCustomList(mobilization)}
      />
      <BrowsableListItem
        leftIcon='globe'
        title='Templates globais'
        subtitle={templatesGlobalLength}
        path={Paths.mobilizationTemplatesChooseGlobalList(mobilization)}
      />
    </BrowsableList>
  </div>
)

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  templatesGlobalLength: TemplateSelectors.getGlobalTemplates(state).length,
  templatesCustomLength: TemplateSelectors.getCustomTemplates(state).length
})

export default connect(mapStateToProps)(TemplateChoosePage)
