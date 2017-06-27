import PropTypes from 'prop-types'
import React from 'react'

import * as paths from '~client/paths'
import * as mobilizationUtils from '~client/mobilizations/utils'
import { Loading } from '~client/components/await'
import { Sidenav, SidenavList, SidenavListItem } from '~client/components/navigation/sidenav'

const Sidebar = ({ children, loading, mobilization, user, community }) => loading ? <Loading /> : (
  <div className='top-0 right-0 bottom-0 left-0 flex flex-column absolute'>
    <Sidenav community={community}>
      {!mobilization ? (
        <SidenavList className='bg-lighten-2'>
          <SidenavListItem
            text='Mobilizações'
            icon='list'
            href={paths.mobilizations()}
          />
          <SidenavListItem
            text='Comunidade'
            icon='info-circle'
            href={paths.communityInfo()}
          />
          <SidenavListItem
            text='Métricas'
            icon='line-chart'
            href={paths.communityReport()}
          />
          <SidenavListItem
            text='Domínios'
            icon='cogs'
            href={paths.communityDomain()}
          />
        </SidenavList>
      ) : (
        <SidenavList className='bg-lighten-2'>
          {!mobilizationUtils.isLaunched(mobilization) ? (
            <SidenavListItem
              text='PUBLICAR BONDE'
              icon='rocket'
              href={paths.mobilizationLaunch(mobilization.id)}
              className='launch-button rounded'
            />
          ) : (
            <SidenavListItem
              text='BONDE público'
              icon='check'
              className='launched-item'
            />
          )}
          <SidenavListItem
            text='Editar mobilização'
            icon='pencil'
            href={paths.editMobilization(mobilization.id)}
          />
          <SidenavListItem
            text='Adicionar conteúdo'
            icon='plus'
            href={paths.createBlock({ id: mobilization.id })}
          />
          <SidenavListItem
            text='Ver em uma nova aba'
            icon='external-link'
            linkType='anchor'
            href={paths.mobilization(mobilization)}
            target='_blank'
          />
          <SidenavListItem
            text='Configurações'
            icon='cog'
            href={paths.basicsMobilization(mobilization.id)}
          />
        </SidenavList>
      )}
      <SidenavList style={{ position: 'absolute', bottom: 0 }}>
        <SidenavListItem text='Minha Conta' icon='user' href={paths.editAccount()}>
          <div className='white h6'>{user.email}</div>
        </SidenavListItem>
        <SidenavListItem
          icon='sign-out'
          text='Sair'
          className='caps'
          href={paths.logout()}
        />
      </SidenavList>
    </Sidenav>
    <div className='flex flex-auto' style={{ marginLeft: 80 }}>
      {children && React.cloneElement(children)}
    </div>
  </div>
)

Sidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  mobilization: PropTypes.object
}

export default Sidebar
