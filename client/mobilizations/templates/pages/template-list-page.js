import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

// Global module dependencies
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import * as paths from '~client/paths'
import EmptyList from '~components/empty-list'

// Parent module dependencies
import { PageHeader } from '~mobilizations/components'
import List from '~mobilizations/components/list'
import {
  Item,
  Avatar,
  Name,
  CreatedAt,
  FundRaising,
  More,
  MoreMenu,
  MoreMenuAction,
  CopyNumber
} from '~mobilizations/components/list/items'
import * as MobilizationSelectors from '~mobilizations/selectors'

// Current module dependencies
import * as TemplateSelectors from '../selectors'
import { asyncDestroyTemplate } from '../action-creators'
import { toggleMenu } from '../../action-creators'

export class TemplatesListPage extends Component {

  componentDidMount () {
    const { toggleMenu } = this.props
    toggleMenu(undefined)
  }

  render () {
    const {
      toggleMenu,
      menuActiveIndex,
      mobilizationTemplates,
      asyncDestroyTemplate,
      location
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Seus templates'>
          <PageHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName='lg-col-12'>
          {
            !mobilizationTemplates.length ? (
              <EmptyList>
                Nenhum template criado. <br />
                Crie a partir de uma mobilização. <br />
                <Link
                  className='bg-pagenta btn caps h3 rounded white py2 px3 mt3'
                  to={paths.mobilizations()}
                >
                  Lista de mobilizações
                </Link>
              </EmptyList>
            ) : (
              <List>
                <Item.Header>
                  <Name.Header />
                  <CreatedAt.Header />
                  <CopyNumber.Header />
                  <FundRaising.Header />
                </Item.Header>

                {
                  mobilizationTemplates &&
                  mobilizationTemplates.map((template, index) => (
                    <Item
                      key={`mobilization-${template.id}`}
                      className={classnames({ 'z2': menuActiveIndex === index })}
                    >
                      <Avatar {...template} />

                      <div className='list-item-table-container overflow-hidden'>
                        <Name {...template} />
                        <CreatedAt {...template} />
                        <CopyNumber {...template} />
                        <FundRaising {...template} />
                      </div>

                      <More onClick={toggleMenu} index={index}>
                        <MoreMenu active={menuActiveIndex === index}>
                          {/* <MoreMenuAction
                            componentClass="div"
                            text="Editar"
                            path={paths.mobilizationTemplatesUpdate(1)}
                            icon="pencil-square-o"
                          /> */}
                          <MoreMenuAction
                            componentClass='div'
                            text='Remover'
                            icon='trash-o'
                            onClick={() => {
                              const confirmMessage = 'Tem certeza que deseja remover este' +
                                ' template? Ao confirmar, não é possível desfazer esta ação.'
                              if (window.confirm(confirmMessage)) asyncDestroyTemplate(template)
                            }}
                          />
                        </MoreMenu>
                      </More>
                    </Item>
                  ))
                }
              </List>
            )
          }
        </SettingsPageContentLayout>
        {
          menuActiveIndex && (
            <div
              className='mobilization-list-more-menu-cancel-overlay z1'
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
              onClick={() => toggleMenu(undefined)}
            />
          )
        }
      </SettingsPageLayout>
    )
  }
}

TemplatesListPage.propTypes = {
  asyncDestroyTemplate: PropTypes.func
}

const mapStateToProps = state => ({
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = { asyncDestroyTemplate, toggleMenu }

export default connect(mapStateToProps, mapActionCreatorsToProps)(TemplatesListPage)
