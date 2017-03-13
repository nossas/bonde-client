import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as paths from '~client/paths'
import EmptyList from '~components/empty-list'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
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

const TemplatesListPage = ({
  menuActiveIndex,
  mobilizationTemplates,
  location,
  // Actions
  toggleMenu,
  asyncDestroyTemplate
}) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout title='Seus templates'>
      <PageHeader {...{ location }} />
    </SettingsPageMenuLayout>
    <SettingsPageContentLayout containerClassName='lg-col-12'>
      {!mobilizationTemplates.length ? (
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

          {mobilizationTemplates && mobilizationTemplates.map((template, index) => (
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
          ))}
        </List>
      )}
    </SettingsPageContentLayout>
    {menuActiveIndex && (
      <div
        className='mobilization-list-more-menu-cancel-overlay z1'
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
        onClick={() => toggleMenu(undefined)}
      />
    )}
  </SettingsPageLayout>
)

TemplatesListPage.propTypes = {
  menuActiveIndex: PropTypes.number,
  mobilizationTemplates: PropTypes.array,
  asyncDestroyTemplate: PropTypes.func,
  toggleMenu: PropTypes.func
}

export default TemplatesListPage
