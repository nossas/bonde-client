import sinon from 'sinon'
import { expect } from 'chai'

import { forceDownloadFile, makeExcelFile } from '../../../modules/widgets/utils/data-export'

describe.skip('app/modules/widgets/action-creators', () => {
  let sandbox

  before(() => {
    sandbox = sinon.sandbox.create()
    global.download = sandbox.spy()
    global.XLSX = sandbox.spy()
  })

  context('#forceDownloadFile', () => {
    // TODO
    expect(forceDownloadFile)
  })

  context('#makeExcelFile', () => {
    const data = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
    const sheetName = 'Foo Bar Sheet Name!'
    const XLSX = {}

    before(() => {
      XLSX.write = sandbox.spy()
    })

    it('should return base64 string', () => {
      expect(makeExcelFile(sheetName, data)).to.be.string
    })
    it('should calls write method', () => {
      expect(XLSX.write).to.have.been.called
    })
  })
})
