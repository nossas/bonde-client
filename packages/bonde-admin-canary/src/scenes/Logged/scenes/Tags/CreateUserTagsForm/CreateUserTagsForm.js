import React from 'react'
import { Button, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Field, FormGraphQL } from 'components/Form'
import UserTagsField from './UserTagsField'
import CreateUserTags from './createUserTags.graphql'
import updateCurrentUserTags from './updateCurrentUserTags'
import PropTypes from 'prop-types'

const CreateUserTagsForm = ({ t, user }) => {
  return (
    <FormGraphQL
      initialValues={{ tags: user.tags.join(';') }}
      mutation={CreateUserTags}
      update={updateCurrentUserTags}
      onSubmit={({ tags }, mutation) => {
        const jsonTags = JSON.stringify({
          tags: tags.split(';')
        })
        return mutation({ variables: { data: jsonTags } })
      }}
    >
      <Field name='tags' component={UserTagsField} />

      <Flexbox horizontal end margin={{ top: 55 }}>
        <Button
          type='submit'
          title={t('buttons.submit')}
        >
          {t('buttons.submit')}
        </Button>
      </Flexbox>
    </FormGraphQL>
  )
}

CreateUserTagsForm.propTypes = {
  t: PropTypes.func,
  user: PropTypes.any
}

export default CreateUserTagsForm
