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
import { UserCommunities, TrendingMobilizationsGadget } from './gadgets'
import PropTypes from 'prop-types'

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

TutorialDialog.propTypes = {
  children: PropTypes.node,
  step: PropTypes.string,
  t: PropTypes.func
}

export default class Home extends Component {
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
                                <UserCommunities />
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

Home.propTypes = {
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string
  })
}
