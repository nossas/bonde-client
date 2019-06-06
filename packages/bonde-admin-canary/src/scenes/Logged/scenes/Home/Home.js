import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import { Tutorial } from 'components'
import { ToastContainer } from 'components/Notification'
import { Page, Header } from 'components/PageLogged'
import { Redirect } from 'services/router'
import { Auth } from 'services/auth'
import {
  CommunitiesGadget,
  TrendingMobilizationsGadget
} from './components'

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

export default class extends Component {
  render () {
    const { lastLocation } = this.props
    const showTutorial = lastLocation && lastLocation.pathname === '/admin/tags'
    return (
      <I18n ns='home'>
        {t => (
          <Auth>
            {({ user }) => user.tags.length < 1
              ? <Redirect to='/admin/tags' />
              : (
                <Tutorial initialize={showTutorial}>
                  <Page
                    renderTitle={() => (<Header.Title>{t('title')}</Header.Title>)}
                    wrapperHeaderComponent={({ children }) => (
                      <TutorialDialog
                        t={t}
                        step={1}
                        placement='bottom-left'
                        margin={{ left: 125 }}
                      >
                        {children}
                      </TutorialDialog>
                    )}
                  > 
                    <Flexbox vertical>
                      <ToastContainer />
                      <Grid>
                        <Cell size={[12, 12, 12]}>
                          <Grid>
                            <Cell size={[6, 6, 12, 12, 12, 12]}>
                              <TutorialDialog t={t} step={2}>
                                <CommunitiesGadget />
                              </TutorialDialog>
                            </Cell>
                            <Cell size={[6, 6, 12, 12, 12, 12]}>
                              <TutorialDialog
                                t={t}
                                step={3}
                                placement='bottom-left'
                              >
                                <TrendingMobilizationsGadget />
                              </TutorialDialog>
                            </Cell>
                          </Grid>
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
