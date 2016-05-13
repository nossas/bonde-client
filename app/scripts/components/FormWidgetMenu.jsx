import React from 'react'
import * as Paths from '../Paths'
import { TabMenuItem } from './'

export default class FormWidgetMenu extends React.Component {
  render () {
    const { mobilization, widget, location } = this.props
    const fieldsPath = Paths.fieldsMobilizationWidget(mobilization.id, widget.id)
    const formPath = Paths.formMobilizationWidget(mobilization.id, widget.id)
    const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)

    return (
      <div className='bg-white px3 clearfix'>
        <h2 className='mb3'>Configure o formulário da sua ação</h2>
        <div>
          <ul className='list-reset mb0'>
            <TabMenuItem
              path={fieldsPath}
              text='Campos do formulário'
              isActive={fieldsPath === location.pathname} />
            <TabMenuItem
              path={formPath}
              text='Ajustes'
              isActive={formPath === location.pathname} />
            <TabMenuItem
              path={autofirePath}
              text='Mensagem de agradecimento'
              isActive={autofirePath === location.pathname} />
          </ul>
        </div>
      </div>
    )
  }
}
