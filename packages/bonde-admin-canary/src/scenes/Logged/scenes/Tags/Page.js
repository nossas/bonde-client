import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Icon,
  Title
} from 'bonde-styleguide'
import { Redirect } from 'react-router'
import { auth } from '../../../../services/auth'
import { translate } from '../../../../services/i18n'
import { Form, Field } from '../../../../components/Form'
import { TagsField } from './components'

class AuthTags extends React.Component {
  state = { redir: false }

  render () {
    const { t, user } = this.props

    if (this.state.redir) return <Redirect to='/' />

    return (
      <Flexbox vertical middle padding='0 26.6%'>
        <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
          {`${t('greetings')}, ${user.firstName}!`}
        </Title.H2>

        <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
          {t('explanation')}
        </Title.H4>

        <Form onSubmit={values => new Promise((resolve, reject) => {
          console.info('[TagsFormSubmit]', values)
          this.setState({ redir: false })
          return resolve()
        })}>
          
          <Field name='tags' component={TagsField} />

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

export default translate('tags')(auth()(AuthTags))
