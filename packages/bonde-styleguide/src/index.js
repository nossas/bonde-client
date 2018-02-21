import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
  }
})

export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as Title } from './Title'
export { default as Text } from './Text'
export { default as Header } from './Header'
