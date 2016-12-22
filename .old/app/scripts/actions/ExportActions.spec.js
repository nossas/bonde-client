import React from 'react'
import sinon from 'sinon'
import superagent from 'superagent'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { downloadFormEntries, makeExcelFile } from './ExportActions'
import * as Paths from './../Paths'

describe('ExportActions', () => {
  // let sandbox
  //
  // before(() => {
  //   sandbox = sinon.sandbox.create()
  //   global.download = sandbox.spy()
  //   global.XLSX = sandbox.spy()
  // })
  //
  // context('#downloadFormEntries', () => {
  //   before(() => {
  //     sandbox.spy(superagent, 'get')
  //     global.makeExcelFile = sandbox.spy()
  //   })
  //   after(() => {
  //     sandbox.restore()
  //   })
  //
  //   beforeEach(() => {
  //     downloadFormEntries()()
  //   })
  //
  //   it('should return a function', () => {
  //     expect(downloadFormEntries()).to.be.a.function
  //   })
  //   it('should calls superagent get method', () => {
  //     expect(superagent.get).to.have.been.called
  //   })
  //   it('should calls superagent get method with mobilizations api endpoint', () => {
  //     const endpoint = `${process.env.API_URL}/mobilizations`
  //     expect(superagent.get.calledWith(endpoint)).to.be.true
  //   })
  //   it('should calls makeExcelFile method', () => {
  //     expect(makeExcelFile).to.have.been.called
  //   })
  //   it('should calls `download` force download method', () => {
  //     expect(download).to.have.been.called
  //   })
  // })
  //
  // context('#makeExcelFile', () => {
  //   const data = [[1,2,3,4],[1,2,3,4],[1,2,3,4]]
  //   const sheetName = 'Foo Bar Sheet Name!'
  //
  //   before(() => {
  //     XLSX.write = sandbox.spy()
  //   })
  //
  //   beforeEach(() => {
  //     makeExcelFile(sheetName, data)
  //   })
  //
  //   it('should return base64 string', () => {
  //     expect(makeExcelFile(sheetName, data)).to.be.string
  //   })
  //   it('should calls write method', () => {
  //     expect(XLSX.write).to.have.been.called
  //   })
  // })
})
