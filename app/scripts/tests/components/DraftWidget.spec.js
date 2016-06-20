import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'
import { DraftWidget, Loading } from './../../components'
import * as Paths from './../../Paths'

let wrapper

describe('DraftWidget', () => {
  let props = {
    dispatch     : () => {},
    auth         : {},
    mobilization : {},
    widget       : {},
    editable     : true
  }

  context('when it is editable', () => {
    before(() => {
      sinon.spy(DraftWidget.prototype, 'updateKind')
    })

    beforeEach(() => {
      wrapper = shallow(<DraftWidget {...props} />)
    })

    after(() => {
      DraftWidget.prototype.updateKind.restore()
    })

    describe('#render', () => {
      it('should render a draft widget containing html elements passing editable prop enabled', () => {
        expect(wrapper.find('div.widget').length).to.equal(1)
        expect(wrapper.find('div.widget h4').length).to.equal(1)
        expect(wrapper.find('div.widget button').length).to.equal(3)
        expect(wrapper.state().loading).to.equal(false)
      })
    })

    describe('#handleContentClick', () => {
      it('should call updateKind with `content` parameter', () => {
        wrapper.find('button').at(0).simulate('click', { preventDefault() {} })

        const updateKind = DraftWidget.prototype.updateKind
        expect(updateKind.called).to.equal(true)
        expect(updateKind.calledWith('content')).to.equal(true)
        expect(wrapper.state().loading).to.equal(true)
      })
    })

    describe('#handleFormClick', () => {
      it('should call updateKind with `form` parameter', () => {
        wrapper.find('button').at(1).simulate('click', { preventDefault() {} })

        const updateKind = DraftWidget.prototype.updateKind
        expect(updateKind.called).to.equal(true)
        expect(updateKind.calledWith('form')).to.equal(true)
        expect(wrapper.state().loading).to.equal(true)
      })
    })

    describe('#handleDonationClick', () => {
      it('should call updateKind with `donation` parameter', () => {
        wrapper.find('button').at(2).simulate('click', { preventDefault() {} })

        const updateKind = DraftWidget.prototype.updateKind
        expect(updateKind.called).to.equal(true)
        expect(updateKind.calledWith('donation')).to.equal(true)
        expect(wrapper.state().loading).to.equal(true)
      })
    })

    describe('#renderLoading', () => {
      it('should return rendered Loading component if `state.loading` is true', () => {
        wrapper.setState({ loading: true })
        expect(wrapper.contains(<Loading />)).to.be.true
      })
    })
  })

  context('when it isn\'t editable', () => {
    before(() => {
      wrapper = shallow(<DraftWidget {...props} editable={false} />)
    })

    describe('#render', () => {
      it('should render an empty div', () => {
        expect(wrapper.contains(<div></div>)).to.be.true
        expect(wrapper.find('div.widget').length).to.equal(0)
        expect(wrapper.find('div.widget h4').length).to.equal(0)
        expect(wrapper.find('div.widget button').length).to.equal(0)
      })
    })
  })
})
