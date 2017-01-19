import { expect } from 'chai'

import * as validator from './validation-helper'

describe('util/validation-helper', () => {
  describe('isValidEmail(email[:string:required])', () => {
    it('should validate is false e-mail name@provedor.com@', () => {
      expect(validator.isValidEmail('name@provedor.com@')).to.be.false
    })
  })

  describe('isValidDomain', () => {
    it('should return false for www..', () => {
      expect(validator.isValidDomain('www..')).to.be.false
    })
    it('should return false for www.foo.bar@.fooz.barz', () => {
      expect(validator.isValidDomain('www.foo.bar@.fooz.barz')).to.be.false
    })
    it('should return false for http://www.foo.bar.fooz.barz', () => {
      expect(validator.isValidDomain('http://www.foo.bar.com')).to.be.false
    })
    it('should return true for www.foo.bar.com', () => {
      expect(validator.isValidDomain('www.foo.bar.com')).to.be.true
    })
  })

  describe('isValidCodeGA', () => {
    it('should return false for FOO-123123123-123', () => {
      expect(validator.isValidCodeGA('FOO-123123123-123')).to.be.false
    })
    it('should return false for FOO-12345678-0', () => {
      expect(validator.isValidCodeGA('FOO-12345678-0')).to.be.false
    })
    it('should return false for FO-87654321-0', () => {
      expect(validator.isValidCodeGA('FOO-12345678-0')).to.be.false
    })
    it('should return true for UA-87654321-0', () => {
      expect(validator.isValidCodeGA('UA-87654321-0')).to.be.true
    })
    it('should return true for YT-87654321-0', () => {
      expect(validator.isValidCodeGA('YT-87654321-0')).to.be.true
    })
    it('should return true for MO-87654321-0', () => {
      expect(validator.isValidCodeGA('MO-87654321-0')).to.be.true
    })
    it('should return true for MO-87654321-0123123123', () => {
      expect(validator.isValidCodeGA('MO-87654321-0123123123')).to.be.true
    })
  })
})
