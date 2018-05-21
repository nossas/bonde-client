import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Icon,
  Title
} from 'bonde-styleguide'
import { Redirect } from 'react-router'
import { auth } from '../../../../services/auth'
import { translate, Interpolate } from '../../../../services/i18n'
import { Form, Field } from '../../../../components/Form'
import { PageAdmin } from '../../../../components'
import { TagsField } from './components'

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

class AuthTags extends React.Component {
  state = { redir: false }

  render () {
    const { t, user, location: { pathname } } = this.props

    if (this.state.redir) return <Redirect to='/admin' />

    return (
      <PageAdmin noActionButtons>
        <div style={classes.container}>
          <div style={classes.flex}>
            <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
              {`${t('greetings')}, ${user.firstName}!`}
            </Title.H2>

            <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
              <Interpolate i18nKey="tags:explanation" br={<br />} />
            </Title.H4>

            <Form onSubmit={values => new Promise((resolve, reject) => {
              console.info('[TagsFormSubmit]', values)
              this.setState({ redir: true })
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
          </div>
        </div>
      </PageAdmin>
    )
  }
}

export default translate('tags')(auth()(AuthTags))
