import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  exportDataClipByEndpoint,
  mountExportDataclip
} from '../actions/ExportActions'
import { Loading } from '../components'
import { Menu as FormWidgetMenu } from './../Widget/plugins/Form/components'
import { Menu as DonationWidgetMenu } from '../Widget/plugins/Donation/components/settings'
import { SettingsPageLayout, SettingsPageContentLayout } from '../../components/Layout'

class ExportWidgetData extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    exportDataClipByEndpoint: PropTypes.func.isRequired,
    mountExportDataclip: PropTypes.func.isRequired,
    exported: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.object
  }

  componentDidMount() {
    this.props.mountExportDataclip()
  }

  widget (props = this.props) {
    const { widgets, params: { widget_id } } = props
    const idStringify = widget => widget.id.toString()
    const currentWidgetIndex = widgets.data.map(idStringify).indexOf(widget_id)
    return widgets.data[currentWidgetIndex]
  }

  fixzero(value) {
    let valueToString = value.toString()
    return valueToString.length === 1 ? '0' + valueToString : valueToString
  }

  formatExportAt(widget) {
    let datetime = new Date(String(widget.exported_at))
    const date = this.fixzero(datetime.getDate()) + '/' + this.fixzero(datetime.getMonth()) + '/' + datetime.getFullYear()
    const time = this.fixzero(datetime.getHours()) + ':' + this.fixzero(datetime.getMinutes())
    return date + ' às ' + time
  }

  renderLoadingMessage() {
    return <span>
      <i className="fa fa-circle-o-notch fa-spin fa-w mr1" />
      Aguarde enquanto estamos processando...
    </span>
  }

  renderExportedMessage(widget = this.widget()) {
    return <span className="olive">
      Última exportação: {this.formatExportAt(widget)}.
      <i className="fa fa-calendar-check-o ml1" />
    </span>
  }

  renderErrorMessage() {
    return <span className="red">{error}</span>
  }

  renderDisclaimer() {
    return <div className="disclaimer clearfix">
      <p className="mb1">
        <span className="h2 orange">
          <i className="fa fa-exclamation mr1" /> Atenção
        </span>
      </p>
      <p className="h5">
        Você está utilizando o navegador Safari. Os passos a seguir são
        necessários devido a uma incompatibilidade.
      </p>
      <ul className="h5">
        <li>
          Clique com o botão direito do mouse no botão abaixo e selecione
          a opção <span className="bold">"Transferir Arquivo Vinculado Como..."</span>
        </li>
        <li>
          Salve o arquivo com o nome desejado e a extensão <span className="bold">.xlsx</span>
        </li>
      </ul>
    </div>
  }

  renderSaveAsContainer() {
    const { loading } = this.props
    return <div id="saveAs" style={{display: loading ? 'none' : 'block'}}></div>
    return <div id="saveAs" style={{display: loading ? 'none' : 'block'}}>
      <a href="#" className="btn btn-outline mb1 bg-pagenta white caps p2">
        <i className="fa fa-download mr1" />
        Salvar planilha
      </a>
    </div>
  }

  renderPage() {
    const {
      mobilization,
      loading,
      error,
      exported,
      success,
      exportDataClipByEndpoint,
      params,
      auth: { credentials }
    } = this.props

    const widget = this.widget()
    const filename = mobilization.name + '.xlsx'
    const adownloadSupport = ("download" in document.createElement("a"))

    return (
      <SettingsPageLayout>
        {( widget.kind === 'donation'
          ? <DonationWidgetMenu {...this.props} widget={widget} />
          : <FormWidgetMenu {...this.props} widget={widget} />
        )}

        <SettingsPageContentLayout>
          <div className="table caps bold mb2 darkengray h6">
            <i className="fa fa-file-excel-o darkengray table-cell align-middle h2" />
            <span className="table-cell align-middle pl1">Exportar</span>
          </div>

          <p className="h5 mb2 darkengray">
            Clique no botão abaixo para baixar o relatório completo do
            formulário em formato excel.
          </p>

          <p className="mb2">
            <button
              disabled={loading}
              className='btn bg-pagenta white caps p2 rounded'
              onClick={() => exportDataClipByEndpoint(
                {
                  mobilization_id: mobilization.id,
                  widget_id: widget.id,
                  filename,
                  credentials
                }
              )}>
              {adownloadSupport
                ? 'Clique para baixar a planilha completa.'
                : 'Clique para processar a planilha completa.'
              }
            </button>
          </p>

          <div className="mb3">
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

  renderLoading() {
    return <Loading />
  }

  render () {
    const { widgets: { data } } = this.props
    return (data.length ? this.renderPage() : this.renderLoading())
  }
}

const mapStateToProps = (globalState) => {
  return {
    loading: globalState.exportDataClip.loading,
    error: globalState.exportDataClip.error,
    success: globalState.exportDataClip.success
  }
}

const mapActionCreators = {
  exportDataClipByEndpoint,
  mountExportDataclip
}

export default connect(mapStateToProps, mapActionCreators)(ExportWidgetData)
