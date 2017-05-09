import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { DraftButton } from '~client/mobrender/widgets/draft/components'

describe('client/mobrender/widgets/draft/components/draft-button', () => {
  const props = {
    icon: 'text',
    label: 'Texto',
    kind: 'content',
    settings: {},
    updateKind: () => {}
  }

  it('should render without crashed', () => {
    const draftButton = mount(<DraftButton {...props} />)
    expect(draftButton).to.be.ok
  })

  it('should called updateKind passing widgetProps like parameter', () => {
    let widgetProps
    const draftButton = mount(
      <DraftButton {...props}
        updateKind={wprops => { widgetProps = wprops }}
      />
    )
    draftButton.find('button').simulate('click')
    expect(widgetProps).to.deep.equal({
      kind: props.kind,
      settings: props.settings
    })
  })
})
