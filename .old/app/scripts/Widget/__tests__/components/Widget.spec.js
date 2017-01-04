import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Widget from './../../'

describe('app/scripts/Widget/components/Widget', () => {
  let widget
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
    widget = shallow(<Widget {...props} />)
  })

  it('should render DrafWidget by default', () => {
    expect(widget.find('DraftWidget')).to.have.length(1)
  })

  it('should throw Error when kind not exists in Widget/plugins', () => {
    widget.setProps({ widget: { id: 1, kind: 'non' } })
    expect(widget.find('span').text()).to.contain('not found')
  })
})
