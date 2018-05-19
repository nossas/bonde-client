import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Icon,
  Tag,
  Title,
  MultipleChoiceField
} from 'bonde-styleguide'
import { Redirect } from 'react-router'

import { translate } from '../../../../services/i18n'
import { Form, Field } from '../../../../components/Form'

const tags = [
  { label: 'Meio Ambiente', value: 'meio-ambiente' },
  { label: 'Direitos Humanos', value: 'direitos-humanos' },
  { label: 'Segurança pública', value: 'seguranca-publica' },
  { label: 'Mobilidade', value: 'mobilidade' },
  { label: 'Direito das Mulheres', value: 'direito-das-mulheres' },
  { label: 'Feminismo', value: 'feminismo' },
  { label: 'Participação Social', value: 'participacao-social' },
  { label: 'Educação', value: 'educacao' },
  { label: 'Transparência', value: 'transparencia' },
  { label: 'Direito LGBTQI+', value: 'direito-lgbtqi' },
  { label: 'Direito à Moradia', value: 'direito-a-moradia' },
  { label: 'Combate à Corrupção', value: 'combate-a-corrupcao' },
  { label: 'Combate ao Racismo', value: 'combate-ao-racismo' },
  { label: 'Saúde Pública', value: 'saude-publica' },
]

class AuthTags extends React.Component {
  state = { redir: false }

  render () {
    const { t } = this.props

    if (this.state.redir) return <Redirect to='/' />

    return (
      <Flexbox vertical middle padding='0 26.6%'>
        <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
          {`${t('greetings')}, Maria!`}
        </Title.H2>

        <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
          {t('explanation')}
        </Title.H4>

        <Form onSubmit={values => new Promise((resolve, reject) => {
          console.info('[TagsFormSubmit]', values)
          this.setState({ redir: false })
          return resolve()
        })}>
          <Field
            name='tags'
            options={tags}
            component={MultipleChoiceField}
            inputComponent={Tag}
          />

          <Flexbox horizontal spacing='between' margin={{ top: 55 }}>
            <Button flat title={t('buttons.addTag')}>
              <Icon name='plus' size={7} />
              {t('buttons.addTag')}
            </Button>
            <Button
              type='submit'
              title={t('buttons.submit')}
            >
              {t('buttons.submit')}
            </Button>
          </Flexbox>
        </Form>
      </Flexbox>
    )
  }
}

export default translate('tags')(AuthTags)
