import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../../../components/Layout'
import { MobilizationsHeader } from '../../../components'
import MobilizationList from '../../../components/MobilizationList'
import {
  MobilizationListItem,
  MobilizationListItemAvatar,
  MobilizationListItemName,
  MobilizationListItemCreatedAt,
  MobilizationListItemCopyNumber,
  MobilizationListItemFundRaising,
  MobilizationListItemMore,
  MobilizationListItemMoreMenu,
  MobilizationListItemMoreMenuAction
}  from '../../../components/MobilizationList/MobilizationListItem'
import {
  MobilizationListItemHeader,
  MobilizationListItemHeaderName,
  MobilizationListItemHeaderCreatedAt,
  MobilizationListItemHeaderCopyNumber,
  MobilizationListItemHeaderFundRaising
}  from '../../../components/MobilizationList/MobilizationListItemHeader'
import {
  setCurrentMobilizationId,
  setMobilizationMoreMenuActiveIndex
} from '../../../MobilizationActions'
import * as MobilizationTemplatesActions from '../MobilizationTemplatesActions'
import { Loading } from '../../../../components'
import EmptyList from '../../../../../components/EmptyList'

export class MobilizationTemplatesListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setMobilizationMoreMenuActiveIndex(undefined))
  }

  render() {
    const {
      dispatch,
      mobilizationMoreMenuActiveIndex,
      mobilizationTemplates,
      destroyTemplateAsync
    } = this.props
    const { loading } = mobilizationTemplates

    return (
      <SettingsPageLayout>
        {loading && <Loading />}
        <SettingsPageMenuLayout title="Suas Mobilizações">
          <MobilizationsHeader {...this.props} />
        </SettingsPageMenuLayout>

        <SettingsPageContentLayout containerClassName="lg-col-12">
          {
            !mobilizationTemplates.custom.length ? (
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
                  mobilizationTemplates.custom &&
                  mobilizationTemplates.custom.map((template, index) => (
                    <MobilizationListItem
                      key={`mobilization-${template.id}`}
                      className={classnames({ 'z2': mobilizationMoreMenuActiveIndex === index })}
                    >
                      <MobilizationListItemAvatar {...template} />

                      <div className="list-item-table-container overflow-hidden">
                        <MobilizationListItemName {...template} />
                        <MobilizationListItemCreatedAt {...template} />
                        <MobilizationListItemCopyNumber {...template} />
                        <MobilizationListItemFundRaising {...template} />
                      </div>

                      <MobilizationListItemMore dispatch={dispatch} index={index}>
                        <MobilizationListItemMoreMenu
                          active={mobilizationMoreMenuActiveIndex === index}
                        >
                          <MobilizationListItemMoreMenuAction
                            componentClass="div"
                            text="Editar"
                            path={Paths.mobilizationTemplatesUpdate(1)}
                            icon="pencil-square-o"
                          />
                          <MobilizationListItemMoreMenuAction
                            componentClass="div"
                            text="Remover"
                            path={Paths.mobilizationTemplatesDestroy(1)}
                            icon="trash-o"
                            onClick={() => {
                              const confirmMessage = 'Tem certeza que deseja remover este template? Ao'
                                + ' confirmar, não é possível desfazer esta ação.'
                              if (window.confirm(confirmMessage)) destroyTemplateAsync(template)
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
          typeof mobilizationMoreMenuActiveIndex !== 'undefined' && (
            <div
              className="mobilization-list-more-menu-cancel-overlay z1"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
              onClick={() => { dispatch(setMobilizationMoreMenuActiveIndex(undefined)) }}
            />
          )
        }
      </SettingsPageLayout>
    )
  }
}

MobilizationTemplatesListPage.propTypes = {
  dispatch: PropTypes.func,
  destroyTemplateAsync: PropTypes.func,
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex,
  mobilizationTemplates: state.mobilizationTemplates,
})

export default connect(
  mapStateToProps,
  MobilizationTemplatesActions
)(MobilizationTemplatesListPage)
