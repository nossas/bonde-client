import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../../components/Layout'
import MobilizationList from '../../../../scripts/Mobilization/components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemUsers,
  MobilizationListItemFundRaising,
  MobilizationListItemMore,
  MobilizationListItemMoreMenu,
  MobilizationListItemMoreMenuAction,
  MobilizationListItemCopyNumber
}  from '../../../../scripts/Mobilization/components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderUsers,
  MobilizationListItemHeaderFundRaising,
  MobilizationListItemHeaderCopyNumber
}  from '../../../../scripts/Mobilization/components/MobilizationList/MobilizationListItemHeader'
import { MobilizationsHeader } from '../../../../scripts/Mobilization/components'
import EmptyList from '../../../../components/EmptyList'
import * as Paths from '../../../../scripts/Paths'

import * as TemplateSelectors from '../selectors'
import * as MobilizationSelectors from '../../selectors'
import { asyncDestroyTemplate } from '../action-creators'
import { toggleMenu } from '../../action-creators'


export class TemplatesListPage extends Component {

  componentDidMount() {
    const { toggleMenu } = this.props
    toggleMenu(undefined)
  }

  render() {
    const {
      toggleMenu,
      loading,
      menuActiveIndex,
      mobilizationTemplates,
      asyncDestroyTemplate,
      location
    } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Seus templates">
          <MobilizationsHeader location={location} />
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout containerClassName="lg-col-12">
          {
            !mobilizationTemplates.length ? (
              <EmptyList>
                Nenhum template criado. <br />
                Crie a partir de uma mobilização. <br />
                <Link
                  className="bg-pagenta btn caps h3 rounded white py2 px3 mt3"
                  to={Paths.mobilizations()}
                >
                  Lista de mobilizações
                </Link>
              </EmptyList>
            ) : (
              <MobilizationList>
                <MobilizationListItemHeader>
                  <MobilizationListItemHeaderName />
                  <MobilizationListItemHeaderCreatedAt />
                  <MobilizationListItemHeaderCopyNumber />
                  <MobilizationListItemHeaderFundRaising />
                </MobilizationListItemHeader>

                {
                  mobilizationTemplates &&
                  mobilizationTemplates.map((template, index) => (
                    <MobilizationListItem
                      key={`mobilization-${template.id}`}
                      className={classnames({ 'z2': menuActiveIndex === index })}
                    >
                      <MobilizationListItemAvatar {...template} />

                      <div className="list-item-table-container overflow-hidden">
                        <MobilizationListItemName {...template} />
                        <MobilizationListItemCreatedAt {...template} />
                        <MobilizationListItemCopyNumber {...template} />
                        <MobilizationListItemFundRaising {...template} />
                      </div>

                      <MobilizationListItemMore onClick={toggleMenu} index={index}>
                        <MobilizationListItemMoreMenu active={menuActiveIndex === index}>
                          {/*<MobilizationListItemMoreMenuAction
                            componentClass="div"
                            text="Editar"
                            path={Paths.mobilizationTemplatesUpdate(1)}
                            icon="pencil-square-o"
                          />*/}
                          <MobilizationListItemMoreMenuAction
                            componentClass="div"
                            text="Remover"
                            icon="trash-o"
                            onClick={() => {
                              const confirmMessage = 'Tem certeza que deseja remover este template? Ao'
                                + ' confirmar, não é possível desfazer esta ação.'
                              if (window.confirm(confirmMessage)) asyncDestroyTemplate(template)
                            }}
                          />
                        </MobilizationListItemMoreMenu>
                      </MobilizationListItemMore>
                    </MobilizationListItem>
                  ))
                }
              </MobilizationList>
            )
          }
        </SettingsPageContentLayout>
        {
          menuActiveIndex && (
            <div
              className="mobilization-list-more-menu-cancel-overlay z1"
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
  asyncDestroyTemplate: PropTypes.func,
}

const mapStateToProps = state => ({
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobilizationSelectors.getMenuActiveIndex(state),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state),
})

const mapActionCreatorsToProps = { asyncDestroyTemplate, toggleMenu }

export default connect(mapStateToProps, mapActionCreatorsToProps)(TemplatesListPage)
