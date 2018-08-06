import React from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Tutorial } from 'components'
import { ToastContainer } from 'components/Notification'
import { Page, Header } from 'components/PageLogged'
import { Redirect } from 'services/router'
import { Auth } from 'services/auth'
import {
  CommunitiesGadget,
  MobilizationsGadget,
  TrendingMobilizationsGadget
} from './components'
import ActionMenu from './ActionMenu'

const TutorialDialog = ({ children, step, t, ...props }) => (
  <Tutorial.Dialog
    step={step}
    name={`tutorial-step-${step}`}
    title={t(`tutorial.steps.${step}.title`)}
    description={t(`tutorial.steps.${step}.description`)}
    {...props}
  >
    {children}
  </Tutorial.Dialog>
)

export default class extends React.Component {
  
  render () {
    const { lastLocation } = this.props
  
    return (
      <I18n ns='home'>
        {t => (
          <Auth>
            {({ user }) => user.tags.length < 1
              ? <Redirect to='/admin/tags' />
              : (
                <Tutorial initialize={lastLocation && lastLocation.pathname === '/admin/tags'}>
                  <Page
                    renderTitle={() => <Header.Title>Home</Header.Title>}
                    renderLeftDropdown={() => (
                      <TutorialDialog t={t} step={1}>
                        <Header.CommunitiesDropdown path='/communities' />
                      </TutorialDialog>
                    )}
                    renderActionButtons={() => (
                      <TutorialDialog t={t} step={2} placement='bottom-right'>
                        <ActionMenu />
                      </TutorialDialog>
                    )}
                  >
                    <Flexbox vertical>
                      <ToastContainer />
                      <Grid>
                        <Cell size={[12, 12, 12]}>
                          <Grid>
                            <Cell size={[4, 4]}>
                              <TutorialDialog t={t} step={3}>
                                <CommunitiesGadget />
                              </TutorialDialog>
                            </Cell>
                            <Cell size={[8, 8]}>
                              <TutorialDialog t={t} step={4} placement='left-top'>
                                <MobilizationsGadget />
                              </TutorialDialog>
                            </Cell>
                          </Grid>
                        </Cell>
                        <Cell size={[12, 12, 12]}>
                          <TutorialDialog t={t} step={5} placement='top-left'>
                            <TrendingMobilizationsGadget />
                          </TutorialDialog>
                        </Cell>
                      </Grid>
                    </Flexbox>
                  </Page>
                </Tutorial>
              )
            }
          </Auth>
        )}
      </I18n>
    )
  }
}
