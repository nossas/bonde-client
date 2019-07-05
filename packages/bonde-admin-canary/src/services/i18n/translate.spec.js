import { translate as translateI18next } from 'react-i18next'
import { translate as translateI18n } from './'
import { expect } from 'chai'

it('translate of react-i18next', () => {
  expect(translateI18next).to.be.equal(translateI18n)
})
