// import React from 'react'

// import { expect } from 'chai'
// import { mount } from 'enzyme'

// import DraftWidget from '../../plugins/DraftWidget/_DraftWidget'
// import * as WidgetComponents from '../../plugins'


// describe('<DraftWidget />', () => {
//   // Remove draft to simulate render menu
//   const components = Object.assign({}, WidgetComponents)
//   delete components['draft']

//   let props = {
//     widget: {
//       id: 1,
//       kind: 'draft'
//     }
//   }
//   let draft

//   beforeEach(() => {
//     draft = mount(<DraftWidget {...props} />)
//   })

//   it('should render menu with options of Widget/plugins', () => {
//     expect(draft.find('button').length).to.equal(Object.keys(components).length)
//   })

//   it('should setWidget when click button', () => {
//     const firstKind = Object.keys(components)[0]

//     let clickedKind
//     draft.setProps({
//       ...props,
//       setWidget: kind => clickedKind = kind
//     })

//     draft.find('button').at(0).simulate('click')

//     expect(firstKind).to.equal(clickedKind)
//   })
// })
