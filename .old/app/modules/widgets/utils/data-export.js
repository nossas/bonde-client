import download from 'downloadjs'
import XLSX from 'xlsx'

import * as t from '../action-types'

const safariCallback = dataBase64 => (fileName, strMimeType) => {
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

export const forceDownloadFile = (workbookBase64, filename) => {
  const extension = filename.match(/.*\.(.+)/)[1]
  const contentType = {
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }[extension]
  const workbook = new Buffer(workbookBase64, 'base64')
  const options = { safariCallback: safariCallback(workbookBase64) }

  download(workbook, filename, contentType, options)
  return dispatch => { dispatch({ type: t.EXPORT_DATACLIP_FORCE_DOWNLOAD }) }
}

export const makeExcelFile = (data, sheetName = 'Sheet 1') => {
  let workbook = { Sheets: {}, Props: {}, SSF: {}, SheetNames: [] }
  let workbookSheet = {}
  let range = { s: {c: 0, r: 0}, e: {c: 0, r: 0} }

  for (let r = 0; r !== data.length; ++r) {
    if (range.e.r < r) range.e.r = r

    for (let c = 0; c !== data[r].length; ++c) {
      if (range.e.c < c) range.e.c = c

      const v = data[r][c]
      const isnum = typeof v === 'number'
      const isbool = typeof v === 'boolean'
      const t = isnum ? 'n' : (isbool ? 'b' : 's')
      const cell = { v, t }

      if (cell.v == null) continue

      const cellRef = XLSX.utils.encode_cell({ c, r })
      workbookSheet[cellRef] = cell
    }
  }
  workbookSheet['!ref'] = XLSX.utils.encode_range(range)

  workbook.SheetNames.push(sheetName)
  workbook.Sheets[sheetName] = workbookSheet

  return XLSX.write(workbook, { type: 'base64' })
}
