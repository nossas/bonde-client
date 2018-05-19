import React from 'react'
import {
  Flexbox2 as Flexbox,
  Tag, Title, Button, Icon
} from 'bonde-styleguide'
import { Redirect } from 'react-router'

import { translate, Interpolate } from '../../../../services/i18n'
import { PageAdmin } from '../../../../components'
import Form, { Field } from '../../../../components/Form'

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 58,
    width: 675,
    textAlign: 'center',
  }
}

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
      <PageAdmin noActionButtons>
        <div style={classes.container}>
          <div style={classes.flex}>
            <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
              {t('greetings', { name: 'Maria' })}
            </Title.H2>

            <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
              <Interpolate i18nKey="auth.tags:explanation" br={<br />} />
            </Title.H4>

            <Form handleSubmit={values => {
              console.info('[TagsFormSubmit]', values)
              this.setState({ redir: true })
            }}>
              {tags.map(({ label, value }) => (
                <Field
                  key={`tag-${value}`}
                  text={label}
                  type='checkbox'
                  name={`tags[${value}]`}
                  component={({ input, ...props }) => <Tag {...props} {...input} />}
                />
              ))}
              <Flexbox horizontal spacing='between' margin={{ top: 55 }}>
                <Button flat>
                  <Icon name='plus' size={7} />
                  {t('add')}
                </Button>
                <Button type='submit'>{t('ok')}</Button>
              </Flexbox>
            </Form>
          </div>
        </div>
      </PageAdmin>
    )
  }
}

export default translate('auth.tags')(AuthTags)
