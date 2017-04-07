import React, { PropTypes } from 'react'

import { ForceDownloadViaAjax } from '~community/components'

const SectionButton = ({ sectionTitle, helperText, buttonTitle, onClick, wrapperStyle }) => (
  <div className='col md-col-12 lg-col-4 px2'>
    <div className='table caps bold mb2 darkengray h6'>
      <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
      <span className='table-cell align-middle pl1'>
        {sectionTitle}
      </span>
    </div>

    <p className='h5 mb2 darkengray' style={{ minHeight: 42 }}>
      {helperText}
    </p>
    <ForceDownloadViaAjax
      title={buttonTitle}
      onClick={onClick}
      className='btn bg-blacker white rounded border-box col-12 center'
      icon='download'
    />
  </div>
)

const CommunitySettingsReportPage = ({
  location,
  community,
  // Actions
  asyncDownloadActivistActions,
  asyncDownloadActivists,
  asyncDownloadDonations
}) => (
  <div className='mxn2'>
    <SectionButton
      sectionTitle='RELATÓRIO DE DOAÇÕES'
      helperText='Clique no botão abaixo para baixar o relatório de doações da comunidade.'
      buttonTitle='Baixar'
      onClick={() => asyncDownloadDonations(community)}
    />
    <SectionButton
      sectionTitle='RELATÓRIO DE AÇÕES'
      helperText='Clique no botão abaixo para baixar o relatório de ações feitas na comunidade.'
      buttonTitle='Baixar'
      onClick={() => asyncDownloadActivistActions(community)}
    />
    <SectionButton
      sectionTitle='RELATÓRIO DE ATIVISTAS'
      helperText='Clique no botão abaixo para baixar o relatório dos ativistas da comunidade.'
      buttonTitle='Baixar'
      onClick={() => asyncDownloadActivists(community)}
    />
  </div>
)

CommunitySettingsReportPage.propTypes = {
  community: PropTypes.object.isRequired,
  // Actions
  asyncDownloadActivistActions: PropTypes.func.isRequired,
  asyncDownloadActivists: PropTypes.func.isRequired,
  asyncDownloadDonations: PropTypes.func.isRequired
}

export default CommunitySettingsReportPage
