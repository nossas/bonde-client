import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Loading } from '~client/components/await'

let wrapper

describe('client/components/await/loading', () => {
  beforeEach(() => {
    wrapper = shallow(<Loading />)
  })

  describe('#render', () => {
    it('should render divs', () => {
      expect(wrapper.find('div')).to.have.length(2)
    })

    it('should render icon', () => {
      expect(wrapper.find('i')).to.have.length(1)
    })
  })
})
