import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { Loading } from '~components/await'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'

// Children modules dependencies
import { SettingsMenu as FormSettingsMenu } from '../__plugins__/form/components'
import { SettingsMenu as DonationSettingsMenu } from '../__plugins__/donation/components'

// Current module dependencies
import * as WidgetActions from '../action-creators'

export class DataExportPage extends Component {
  componentDidMount () {
    const { dataExportMount } = this.props
    dataExportMount()
  }

  widget (props = this.props) {
    const { widgets, params: { widget_id } } = props
    const idStringify = widget => widget.id.toString()
    const currentWidgetIndex = widgets.map(idStringify).indexOf(widget_id)
    return widgets[currentWidgetIndex]
  }

  fixzero (value) {
    let valueToString = value.toString()
    return valueToString.length === 1 ? '0' + valueToString : valueToString
  }

  formatExportAt (widget) {
    let datetime = new Date(String(widget.exported_at))
    const date = this.fixzero(datetime.getDate()) + '/' + this.fixzero(datetime.getMonth() + 1) + '/' + datetime.getFullYear()
    const time = this.fixzero(datetime.getHours()) + ':' + this.fixzero(datetime.getMinutes())
    return date + ' às ' + time
  }

  renderLoadingMessage () {
    return <span>
      <i className='fa fa-circle-o-notch fa-spin fa-w mr1' />
      Aguarde enquanto estamos processando...
    </span>
  }

  renderExportedMessage (widget = this.widget()) {
    return <span className='olive'>
      Última exportação: {this.formatExportAt(widget)}.
      <i className='fa fa-calendar-check-o ml1' />
    </span>
  }

  renderErrorMessage () {
    const { error } = this.props
    return <span className='red'>{error}</span>
  }

  renderDisclaimer () {
    return <div className='disclaimer clearfix'>
      <p className='mb1'>
        <span className='h2 orange'>
          <i className='fa fa-exclamation mr1' /> Atenção
        </span>
      </p>
      <p className='h5'>
        Você está utilizando o navegador Safari. Os passos a seguir são
        necessários devido a uma incompatibilidade.
      </p>
      <ul className='h5'>
        <li>
          Clique com o botão direito do mouse no botão abaixo e selecione
          a opção <span className='bold'>"Transferir Arquivo Vinculado Como..."</span>
        </li>
        <li>
          Salve o arquivo com o nome desejado e a extensão <span className='bold'>.xlsx</span>
        </li>
      </ul>
    </div>
  }

  renderSaveAsContainer () {
    const { loading } = this.props
    return <div id='saveAs' style={{display: loading ? 'none' : 'block'}} />
  }

  renderPage () {
    const {
      mobilization,
      loading,
      error,
      success,
      // Actions
      asyncWidgetDataExport
    } = this.props

    const widget = this.widget()
    const filename = mobilization.name + '.xlsx'
    const adownloadSupport = ('download' in document.createElement('a'))

    return (
      <SettingsPageLayout>
        {(widget.kind === 'donation'
          ? <DonationSettingsMenu {...this.props} widget={widget} />
          : <FormSettingsMenu {...this.props} widget={widget} />
        )}

        <SettingsPageContentLayout>
          <div className='table caps bold mb2 darkengray h6'>
            <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
            <span className='table-cell align-middle pl1'>Exportar</span>
          </div>

          <p className='h5 mb2 darkengray'>
            Clique no botão abaixo para baixar o relatório completo do
            formulário em formato excel.
          </p>

          <p className='mb2'>
            <button
              disabled={loading}
              className='btn bg-pagenta white caps p2 rounded'
              onClick={() => asyncWidgetDataExport({ mobilization, widget, filename })}
            >
              {adownloadSupport
                ? 'Clique para baixar a planilha completa.'
                : 'Clique para processar a planilha completa.'
              }
            </button>
          </p>

          <div className='mb3'>
            {(loading ? this.renderLoadingMessage() : null)}
            {(widget.exported_at && !loading ? this.renderExportedMessage() : null)}
            {(error ? this.renderErrorMessage() : null)}
          </div>

          {(!adownloadSupport && !loading && success ? this.renderDisclaimer() : null)}
          {(!adownloadSupport ? this.renderSaveAsContainer() : null)}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }

  render () {
    return (this.props.widgets.length ? this.renderPage() : <Loading />)
  }
}

DataExportPage.propTypes = {
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.object,
  widgets: PropTypes.array.isRequired,
  // Actions
  asyncWidgetDataExport: PropTypes.func.isRequired,
  dataExportMount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.widgets.dataExport.loading,
  error: state.widgets.dataExport.error,
  success: state.widgets.dataExport.success
})

export default connect(mapStateToProps, WidgetActions)(DataExportPage)
