import * as t from '../action-types'
import { forceDownloadFile, makeExcelFile } from '../utils/data-export'
import { createAction } from './create-action'

const asyncWidgetDataExport = params => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()
  const { mobilization, widget, filename } = params

  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const config = { headers: credentials, params }

  dispatch({ type: t.EXPORT_DATACLIP_REQUEST })
  return axios.get(endpoint, config)
    .then(response => {
      if (!response.data.length) {
        window.alert('Nao foi encontrado nenhum dado para ser exportado')
        dispatch({ type: t.EXPORT_DATACLIP_NO_DATA_FOUND })
        return Promise.resolve()
      }
      const data = response.data.map(({ fields }) => {
        return JSON.parse(fields).map(({ label, value }) => ({ label, value }))
      })
      const matrix = [
        data.length && data[0].map(entity => entity.label)
      ].concat(data.map(row => row.map(entity => entity.value)))

      forceDownloadFile(
        makeExcelFile(matrix),
        filename || 'export.xlsx'
      )
      dispatch(createAction(t.EXPORT_DATACLIP_SUCCESS, { widget }))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.EXPORT_DATACLIP_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetDataExport
