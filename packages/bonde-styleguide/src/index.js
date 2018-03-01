import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
  }
})

export { default as Assets } from './Assets'
export { default as Button } from './Button'
export { default as Card } from './Card/Card'
export { default as Container } from './Container'
export { default as Title } from './Title'
export { default as Text } from './Text'
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as Navbar } from './Navbar'
export { default as Number } from './Number'
export { default as Icon } from './Icon'
export { default as IconColorful } from './IconColorful'
export { default as Image } from './Image'
export { default as Page } from './Layout/Page'
export { default as ProgressRanking } from './ProgressRanking'
