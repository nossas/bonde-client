import React from 'react'
import { expect } from 'chai'

import { sanitize } from '~utils/string-helper'

describe('app/util/string-helper', () => {
  describe('#sanitize', () => {
    it('should return a lowercase string that contains uppercase', () => {
      expect(sanitize('Foo')).to.be.equal('foo')
    })
    it('should return a sanitized string that contains white spaces and uppercase', () => {
      expect(sanitize('foo bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains white spaces', () => {
      expect(sanitize('Foo Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dash', () => {
      expect(sanitize('foo-bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dash and uppercase', () => {
      expect(sanitize('Foo-Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dot', () => {
      expect(sanitize('foo.bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains dot and uppercase', () => {
      expect(sanitize('Foo.Bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains underscore', () => {
      expect(sanitize('foo_bar')).to.be.equal('foobar')
    })
    it('should return a sanitized string that contains underscore and uppercase', () => {
      expect(sanitize('Foo_Bar')).to.be.equal('foobar')
    })
    it('should return a lowercase string that contains all uppercase', () => {
      expect(sanitize('FOOBAR')).to.be.equal('foobar')
    })
    it('should return sanitized that contains white space, dots, dashes and underscores', () => {
      expect(sanitize('foo bar  Hello.world--baz_Foo')).to.be.equal('foobarhelloworldbazfoo')
    })
  })
})
