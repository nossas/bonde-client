import { Draft } from './draft/components'
import {
  Pressure,
  Form,
  Content,
  Donation
} from '~client/mobilizations/widgets/__plugins__'
import { createEditorContent } from '~client/mobilizations/widgets/__plugins__/content/components/editor-slate'
import * as Paths from '~client/paths'

export default (mobilization, widget, { intl }) => [
  {
    component: Draft,
    kind: 'draft',
    settings: {}
  },
  {
    component: Content,
    kind: 'content',
    icon: 'font',
    label: intl.formatMessage({
      id: 'widgets.config--content.label',
      defaultMessage: 'Texto'
    }),
    settings: {
      content: createEditorContent(
        intl.formatMessage({
          id: 'widgets.config--content.default',
          defaultMessage: 'Clique aqui para editar...'
        })
      )
    }
  },
  {
    component: Form,
    kind: 'form',
    icon: 'list',
    label: intl.formatMessage({
      id: 'widgets.config--form.label',
      defaultMessage: 'Formulário'
    }),
    settings: {
      email_text: intl.formatMessage({
        id: 'widgets.config--form.default',
        defaultMessage: 'Obrigado por apostar na força da ação coletiva! Sua participação é muito importante e, agora, precisamos da sua ajuda para potencializar nosso impacto. Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço'
      })
    },
    redirect: Paths.formMobilizationWidget(mobilization.id, widget.id)
  },
  {
    component: Pressure,
    kind: 'pressure',
    icon: 'bullseye',
    label: intl.formatMessage({
      id: 'widgets.config--pressure.label',
      defaultMessage: 'Pressão'
    }),
    settings: {
      main_color: '#f23392',
      title_text: intl.formatMessage({
        id: 'widgets.config--pressure.default.title',
        defaultMessage: 'Envie um e-mail para quem pode tomar essa decisão'
      }),
      button_text: intl.formatMessage({
        id: 'widgets.config--pressure.default.button-text',
        defaultMessage: 'Enviar e-mail'
      })
      /* reply_email: user.email */
    },
    redirect: Paths.pressure(mobilization.id, widget.id)
  },
  {
    component: Donation,
    kind: 'donation',
    icon: 'money',
    label: intl.formatMessage({
      id: 'widgets.config--donation.label',
      defaultMessage: 'Doação'
    }),
    redirect: Paths.donation(mobilization.id, widget.id)
  }
]
