import React, { Component } from 'react'

import {
  Sidenav,
  SidenavList,
  SidenavListItem
} from '../../../components/Navigation'
import { getMobilization } from '../../Mobilization/MobilizationSelectors'
import * as Paths from '../../Paths'

class DashboardSidebar extends Component {

  render () {
    const { auth, mobilization: { currentId } } = this.props

    return (
      <Sidenav {...this.props}>
        {
          !currentId ? null : (
            <SidenavList className='bg-lighten-2'>
              <SidenavListItem
                text='Editar mobilização'
                icon='pencil'
                href={Paths.editMobilization(currentId)}
              />
              <SidenavListItem
                text='Adicionar conteúdo'
                icon='plus'
                href={Paths.createBlock({ id: currentId })}
              />
              <SidenavListItem
                text='Ver em uma nova aba'
                icon='external-link'
                linkType='anchor'
                href={Paths.mobilization(getMobilization(this.props))}
                target='_blank'
              />
              <SidenavListItem
                text='Configurações'
                icon='cog'
                href={Paths.basicsMobilization(currentId)}
              />
              {/* <SidenavListItem
                text="Lançar mobilização"
                icon="flag"
              /> */}
            </SidenavList>
          )
        }
        <SidenavList style={{ position: 'absolute', bottom: '0' }}>
          <SidenavListItem text='Minha Conta' icon='user' href={Paths.editAccount()}>
            <div className='white h6'>{auth.user.email}</div>
          </SidenavListItem>
          <SidenavListItem
            icon='sign-out'
            text='Sair'
            className='caps'
            href={Paths.logout()}
          />
        </SidenavList>
      </Sidenav>
    )
  }
}

export default DashboardSidebar
