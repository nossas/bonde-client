import React from 'react'
import { translate } from '../../../../services/i18n'
import {
  Header, Page, Footer,
  Navbar, MainNav, UserNav,
  Button,
  Grid, Cell
} from 'bonde-styleguide'

import { CommunityList, MobilizationList, TrendingMobs } from './components'

const Home = ({ t, i18n }) => {
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng)
  // }

  return (
    <div>
      <Header
        pageTitle={t('home')}
        navbar={() => (
          <Navbar>
            <MainNav />
            <UserNav />
          </Navbar>
        )}
        actionButtons={[
          <Button dark onClick={() => alert('Button: onClick')}>
            {t('create-mobilization')}
          </Button>,
          <Button onClick={() => alert('Button: onClick')}>
            {t('create-community')}
          </Button>
        ]}
      />

      <Page>
        <Grid>
          <Cell size={[12, 12, 12]}>
            <Grid>
              <Cell size={[4, 4]}>
                <CommunityList t={t} />
              </Cell>
              <Cell size={[8, 8]}>
                <MobilizationList t={t} />
              </Cell>
            </Grid>
          </Cell>
          <Cell size={[12, 12, 12]}>
            <TrendingMobs t={t} />
          </Cell>
        </Grid>
      </Page>

      <Footer
        btnHelpLabel={t('help')}
        btnHelpClick={() => alert('help clicked!')}
      >
        <a href='#about' title='Sobre'>{t('about')}</a>
        <a href='#contact' title='Contato'>{t('contact')}</a>
      </Footer>
    </div>
  )
}

export default translate('home')(Home)
