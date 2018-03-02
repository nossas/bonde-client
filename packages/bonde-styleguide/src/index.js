import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
  }
})

// export { default as Assets } from './Assets'
// export { default as Header } from './Header'
// export { default as Footer } from './Footer'
// export { default as Navbar } from './Navbar'
// export { default as Image } from './Image'
// export { default as Page } from './Layout/Page'

export { default as Card } from './cards/Card/Card'

export { default as Button } from './content/Button/Button'
export { default as Icon } from './content/Icon/Icon'
export { default as IconColorful } from './content/IconColorful/IconColorful'
export { default as Number } from './content/Number/Number'
export { default as Text } from './content/Text/Text'
export { default as Title } from './content/Title/Title'

export { default as Cell } from './layout/Cell/Cell'
export { default as Container } from './layout/Container/Container'
export { default as Grid } from './layout/Grid/Grid'

export { default as Feed } from './list/Feed/Feed'
export { default as FeedItem } from './list/FeedItem/FeedItem'

export { default as Loading } from './await/Loading/Loading'

export { default as ProgressBar } from './progress/ProgressBar/ProgressBar'
export { default as ProgressRanking } from './progress/ProgressRanking/ProgressRanking'
export { default as ProgressRankingItem } from './progress/ProgressRankingItem/ProgressRankingItem'

export { default as Tab } from './navigation/Tab/Tab'
export { default as TabItem } from './navigation/TabItem/TabItem'

