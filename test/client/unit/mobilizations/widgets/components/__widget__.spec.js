import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import Widget from '~mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/__widget__', () => {
  let metamorphicProps
  let wrapper
  let props = {
    widget: {
      id: 1,
      kind: 'draft'
    },
    dispatch: () => {},
    auth: {},
    mobilization: {},
    editable: true
  }

  beforeEach(() => {
    wrapper = shallow(<Widget {...props} />)
  })

  it('should render Draf widget component by default', () => {
    expect(wrapper.find('Draft')).to.have.length(1)
  })

  it('should render connected Pressure widget component if kind it is "pressure"', () => {
    wrapper.setProps(changeKind({ props, kind: 'pressure' }))
    expect(wrapper.find('Connect(Pressure)')).to.have.length(1)
  })

  it('should render Form widget component if widget kind it is "form"', () => {
    wrapper.setProps(changeKind({ props, kind: 'form' }))
    expect(wrapper.find('Form')).to.have.length(1)
  })

  it('should render Draft widget component if widget kind it is "draft"', () => {
    wrapper.setProps(changeKind({ props, kind: 'draft' }))
    expect(wrapper.find('Draft')).to.have.length(1)
  })

  it('should render Donation widget component if widget kind it is "donation"', () => {
    wrapper.setProps(changeKind({ props, kind: 'donation' }))
    expect(wrapper.find('Donation')).to.have.length(1)
  })

  it('should render Content widget component if widget kind it is "content"', () => {
    metamorphicProps = changeKind({ props, kind: 'content' })
    wrapper.setProps({ ...metamorphicProps, onEdit: mock.noop, onCancelEdit: mock.noop })
    expect(wrapper.find('Content')).to.have.length(1)
  })

  it('should render Match widget component if widget kind it is "match"', () => {
    wrapper.setProps(changeKind({ props, kind: 'match' }))
    expect(wrapper.find('Match')).to.have.length(1)
  })

  it('should throw Error when kind not exists in Widget/plugins', () => {
    wrapper.setProps({ widget: { id: 1, kind: 'non' } })
    expect(wrapper.find('span').text()).to.contain('not found')
  })
})

const changeKind = ({ props, kind }) => {
  return { ...props, widget: { ...props.widget, kind } }
}
