import superagent from 'superagent'
import download from 'downloadjs'
import XLSX from 'xlsx'

export const EXPORT_DATACLIP_REQUEST = 'EXPORT_DATACLIP_REQUEST'
export const EXPORT_DATACLIP_SUCCESS = 'EXPORT_DATACLIP_SUCCESS'
export const EXPORT_DATACLIP_FAILURE = 'EXPORT_DATACLIP_FAILURE'
export const EXPORT_DATACLIP_FORCE_DOWNLOAD = 'EXPORT_DATACLIP_FORCE_DOWNLOAD'
export const EXPORT_DATACLIP_MOUNT = 'EXPORT_DATACLIP_MOUNT'

export const exportDataClipByEndpoint = (options) => {
  return dispatch => {
    dispatch({ type: EXPORT_DATACLIP_REQUEST })

    superagent
      .get(`${process.env.API_URL}/mobilizations/${options.mobilization_id}/form_entries`)
      .query(options)
      .set(options.credentials)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch({ type: EXPORT_DATACLIP_FAILURE, error: err || res.body})
        } else {
          const data = res.body.length && res.body.map(entity => {
            const fields = JSON.parse(entity.fields)
            return fields.map(field => {
              const { label, value } = field
              return { label, value }
            })
          })

          const matriz = [
            data.length && data[0].map(entity => entity.label)
          ].concat(data.map(row => row.map(entity => entity.value)))

          forceDownloadFile(makeExcelFile(matriz), options.filename || 'export.xlsx')
          dispatch({ type: EXPORT_DATACLIP_SUCCESS, widget_id: options.widget_id })
        }
      })
  }
}

const forceDownloadFile = (workbookBase64, filename) => {
  const extension = filename.match(/.*\.(.+)/)[1]
  const contentType = {
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }[extension]
  const workbook = new Buffer(workbookBase64, 'base64')
  const options = {
    safariCallback: safariCallback(workbookBase64)
  }

  download(workbook, filename, contentType, options)
  return dispatch => { dispatch({ type: EXPORT_DATACLIP_FORCE_DOWNLOAD }) }
}

const safariCallback = (dataBase64) => {
  return (fileName, strMimeType) => {
    const icon = document.createElement('span')
    icon.className = 'fa fa-download mr1'

    const text = document.createElement('span')
    text.innerText = 'Salvar planilha'

    const url = `data:${strMimeType};base64,${dataBase64}`
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.className = 'btn btn-outline mb1 aqua caps p2'
    anchor.setAttribute('download', fileName)
    anchor.appendChild(icon)
    anchor.appendChild(text)
    anchor.onclick = e => false
    document.getElementById('saveAs').innerHTML = ''
    document.getElementById('saveAs').appendChild(anchor)
  }
}

const makeExcelFile = (data, sheetName = 'Sheet 1') => {
  let workbook = { Sheets: {}, Props: {}, SSF: {}, SheetNames: [] }
  let workbookSheet = {}
  let range = { s: {c: 0, r: 0}, e: {c: 0, r: 0} }

  for (let r = 0; r != data.length; ++r) {
    if (range.e.r < r) range.e.r = r

    for (let c = 0; c != data[r].length; ++c) {
      if (range.e.c < c) range.e.c = c

      const v = data[r][c]
      const isnum = typeof v === 'number'
      const isbool = typeof v === 'boolean'
      const t = isnum ? 'n' : (isbool ? 'b' : 's')
      const cell = { v, t }

      if (cell.v == null) continue

      const cell_ref = XLSX.utils.encode_cell({ c, r })
      workbookSheet[cell_ref] = cell
    }
  }
  workbookSheet['!ref'] = XLSX.utils.encode_range(range)

  workbook.SheetNames.push(sheetName)
  workbook.Sheets[sheetName] = workbookSheet

  const type = 'base64'
  return XLSX.write(workbook, { type })
}

export const mountExportDataclip = () => {
  return {
    type: EXPORT_DATACLIP_MOUNT
  }
}
