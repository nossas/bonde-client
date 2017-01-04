import React from 'react'
import { shallow } from 'enzyme'

import { CustomDomainWrapper } from '../../pages/CustomDomainWrapper/CustomDomainWrapper'
import ShowMobilization from '../../pages/ShowMobilization'

describe('CustomDomainWrapper', () => {
  const props = {
    blocks: {data: []},
    widgets: {data: []},
    mobilizations: [],
    auth: {},
    dispatch: () => {}
  }

  describe('#render', () => {
    it('should not render ShowMobilization when there is no mobilization', () => {
      const component = shallow(<CustomDomainWrapper {...props} />)
      expect(component.find('ShowMobilization')).to.have.length(0)
    })

    it('should render ShowMobilization when there is a mobilization', () => {
      const component = shallow(<CustomDomainWrapper {...props} mobilizations={[{id: 1}]} />)
      expect(component.find('ShowMobilization')).to.have.length(1)
    })

    it('should render GoogleFontsLoader when there is a mobilization', () => {
      const component = shallow(<CustomDomainWrapper {...props} mobilizations={[{id: 1}]} />)
      expect(component.find('GoogleFontsLoader')).to.have.length(1)
    })

    it('should render TechnicalIssues error page when there is no mobilizations', () => {
      const component = shallow(<CustomDomainWrapper {...props} mobilizations={[]} />)
      expect(component.find('TechnicalIssues')).to.have.length(1)
    })
  })
})
