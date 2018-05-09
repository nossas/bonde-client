import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { translate as translateI18next } from 'react-i18next'
import { translate as translateI18n } from './'

test('translate of react-i18next', t => {
  t.is(translateI18next, translateI18n)
})
