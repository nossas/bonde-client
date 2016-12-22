// import React from 'react'
// import { shallow } from 'enzyme'
// import { expect } from 'chai'

// import { WYSIHTMLToolbar } from './WYSIHTMLToolbar.jsx'
// import { fetchGoogleFontsSuccess } from '../Widget/actions'

// describe('WYSIHTMLToolbar', function() {
//   let wrapper
//   const googleFonts = {
//     kind: 'webfonts#webfontList',
//     items: [
//       {
//         kind: 'webfonts#webfont',
//         family: 'ABeeZee',
//         category: 'sans-serif',
//         variants: ['regular', 'italic'],
//         subsets: ['latin'],
//         version: 'v9',
//         lastModified: '2016-05-31',
//         files: {
//           regular: 'http://fonts.gstatic.com/s/abeezee/v9/mE5BOuZKGln_Ex0uYKpIaw.ttf',
//           italic: 'http://fonts.gstatic.com/s/abeezee/v9/kpplLynmYgP0YtlJA3atRw.ttf'
//         }
//       },
//       {
//         kind: 'webfonts#webfont',
//         family: 'Abel',
//         category: 'sans-serif',
//         variants: ['regular'],
//         subsets: ['latin'],
//         version: 'v6',
//         lastModified: '2016-05-31',
//         files: {
//           regular: 'http://fonts.gstatic.com/s/abel/v6/RpUKfqNxoyNe_ka23bzQ2A.ttf'
//         }
//       },
//     ]
//   }
//   const props = {
//     elementId: 'some-id',
//     className: 'some-class',
//     fetchGoogleFonts: () => {},
//     googleFonts
//   }

//   before(() => {
//     wrapper = shallow(<WYSIHTMLToolbar {...props} />)
//   })

//   describe('#render', () => {
//     it('should set the element id', () => {
//       const toolbar = wrapper.find('.wysihtml-toolbar')
//       expect(toolbar.props().id).to.be.eql('some-id')
//     })
//     it('should set the element classes', () => {
//       const toolbar = wrapper.find('.wysihtml-toolbar')
//       expect(toolbar.props().className).to.have.string('some-class')
//     })
//   })

//   describe('Google Fonts', () => {
//     context('when have googleFonts async result', () => {
//       let googleFontsWrapper
//       before(() => {
//         googleFontsWrapper = wrapper.find('.google-fonts')
//       })

//       it('should render the div.google-fonts', () => {
//         expect(googleFontsWrapper).to.have.length(1)
//       })
//       it('should render the <select>', () => {
//         expect(googleFontsWrapper.find('select')).to.have.length(1)
//       })
//       it('should render the <options> length as googleFonts items quantity', () => {
//         expect(googleFontsWrapper.find('select option')).to.have.length(googleFonts.items.length)
//       })
//     })

//     context('when do not have googleFonts async result', () => {
//       let googleFontsWrapper
//       const emptyGoogleFonts = { googleFonts: { items: [] } }
//       before(() => {
//         wrapper.setProps(emptyGoogleFonts)
//         googleFontsWrapper = wrapper.find('.google-fonts')
//       })

//       it('should render the div.google-fonts', () => {
//         expect(googleFontsWrapper).to.have.length(0)
//       })
//     })
//   })
// })
