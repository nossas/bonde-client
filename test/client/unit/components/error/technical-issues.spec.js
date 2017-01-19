import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TechnicalIssues } from '../../../../../common/components/error'

jest.mock('../../../../../.old/app/components/Navigation/Sidenav/logo-icon.svg', ()=> 'test-file-stub');

describe('components/error/technical-issues', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TechnicalIssues {...props} />)
  })

  describe('#render', () => {
    it('should render witouth crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
