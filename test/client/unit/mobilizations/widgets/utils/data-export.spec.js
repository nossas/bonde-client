import sinon from 'sinon'
import { expect } from 'chai'

// Current module dependencies
import { forceDownloadFile, makeExcelFile } from '~mobilizations/widgets/utils/data-export'

describe.skip('client/mobilizations/widgets/utils/data-export', () => {
  let sandbox

  beforeAll(() => {
    sandbox = sinon.sandbox.create()
    global.download = sandbox.spy()
    global.XLSX = sandbox.spy()
  })

  describe('#forceDownloadFile', () => {
    // TODO
    expect(forceDownloadFile)
  })

  describe('#makeExcelFile', () => {
    const data = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
    const sheetName = 'Foo Bar Sheet Name!'
    const XLSX = {}

    beforeAll(() => {
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
