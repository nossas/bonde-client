import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Widget from '~client/mobrender/components/widget'
import WidgetOverlay from '~client/mobrender/components/widget-overlay.connected'

describe('client/mobrender/components/widget', () => {
  const props = {
    mobilization: { id: 2 },
    widget: { id: 1, kind: 'draft', sm_size: 3, md_size: 3, lg_size: 3 },
    update: widget => {}
  }

  it('should render without crashed', () => {
    const widget = shallow(<Widget {...props} />)
    expect(widget).to.be.ok
  })

  it('should contains classes to resize component', () => {
    const { sm_size: smSize, md_size: mdSize, lg_size: lgSize } = props.widget
    const className = `col-${smSize} sm-col-${smSize} md-col-${mdSize} lg-col-${lgSize}`
    const widget = shallow(<Widget {...props} />)
    expect(widget.find('div').at(0).props().className).to.contains(className)
  })

  it('should render component children according kind', () => {
    const widget = shallow(<Widget {...props} editable />)
    expect(widget.find('Draft').length).to.equal(1)
  })

  it('should render component loading while saving widget', () => {
    const widget = shallow(<Widget {...props} saving />)
    expect(widget.find('Loading').length).to.equal(1)
  })

  it('should passed widget and update to children', () => {
    const widget = shallow(<Widget {...props} editable />)
    expect(widget.find('Draft').props().widget).to.deep.equal(props.widget)
    expect(widget.find('Draft').props().update).to.equal(props.update)
  })

  /*
  // TODO: Need config redirect and editable to render widget overlay
  it('should render overlay when editable', () => {
    const widget = shallow(<Widget {...props} editable={true} />)
    expect(widget.find(WidgetOverlay).length).to.equal(1)
  })
  */

  it('should not render overlay when editable is false', () => {
    const widget = shallow(<Widget {...props} />)
    expect(widget.find(WidgetOverlay).length).to.equal(0)
  })

  describe('when editable is false', () => {
    it('should not render draft widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      expect(widget.find('Draft').length).to.equal(0)
    })

    it('should render pressure widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'pressure' } })
      expect(widget.find('Connect(Pressure)').length).to.equal(1)
    })

    it('should render form widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'form' } })
      expect(widget.find('Connect(Form)').length).to.equal(1)
    })

    it('should render donation widget component', () => {
      const widget = shallow(<Widget {...props} editable={false} />)
      widget.setProps({ ...props, widget: { ...props.widget, kind: 'donation' } })
      expect(widget.find('Connect(Donation)').length).to.equal(1)
    })
  })
})
