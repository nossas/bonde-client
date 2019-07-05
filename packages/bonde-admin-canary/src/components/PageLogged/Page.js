import React from 'react'
import { Page as Content } from 'bonde-styleguide'
import Header from './Header'
import Footer from './Footer'

const Page = ({
  children,
  renderTitle,
  renderActionButtons,
  renderTabs,
  wrapperHeaderComponent: WrapperHeader,
  fixedFooter,
  ...pageProps
}) => {
  // calculate height to resize content and fix Footer component on bottom page
  const height = (window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight) - 158

  const headerNode = (
    <Header
      renderTitle={renderTitle}
      renderActionButtons={renderActionButtons}
      renderTabs={renderTabs}
    />
  )

  return (
    <div>
      {WrapperHeader ? (
        <WrapperHeader>
          {headerNode}
        </WrapperHeader>
      ) : headerNode}

      <Content {...pageProps} height={height}>{children}</Content>
      <Footer fixed={fixedFooter} />
    </div>
  )
}

Page.propTypes = {
  ...Header.propTypes
}

export default Page
