import React from 'react'
import { Mobilization } from '@mobs'
import { PluggableWidget } from '@mobs/ux'
//Plugins
import { DraftPlugin } from '@mobs/plugins/draft'
import { FormPlugin } from '@mobs/plugins/form'
import { Content, Donation, Pressure } from '@/mobilizations/widgets/__plugins__'
// TODO: Review this concept
import { mobrenderHOC } from '@/mobrender/components/mobilization.connected'
// TODO: Icons should be inside plugin reference.
import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'


const plugins = [
  { 
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  },
  {
    kind: 'form',
    component: FormPlugin,
    options: DraftPlugin.setOptions({
      label: 'Formulário',
      icon: () => (<i className='fa fa-list block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'donation',
    component: Donation,
    options: DraftPlugin.setOptions({
      label: 'Doação',
      icon: () => (<i className='fa fa-money block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure',
    component: Pressure,
    options: DraftPlugin.setOptions({
      label: 'Pressão por e-mail',
      icon: PressureEmailIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure-phone',
    component: Pressure,
    options: DraftPlugin.setOptions({
      label: 'Pressão por telefone',
      icon: PressurePhoneIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'content',
    component: Content,
    options: Object.assign(
      {},
      DraftPlugin.setOptions({
        label: 'Texto',
        icon: () => (<i className='fa fa-font block white' />),
        action: (widget) => {
          console.log(`update widget ${widget.id}`)
        }
      }),
      { noOverlay: true }
    )
  }
]

class MobilizationPreview extends React.Component {

  render () {
    // Properties received by HOC
    const { blocks, widgets } = this.props
    return (
      <Mobilization
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        extraWidgetProps={{
          mobilization: this.props.mobilization,
          editable: this.props.editable,
          plugins: plugins
        }}
      />
    )
  }
}

export default mobrenderHOC(MobilizationPreview)