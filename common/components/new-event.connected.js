import { reduxForm } from 'redux-form'
import { createEvent } from '../redux/action-creators/create-event'
import NewEvent from './new-event/new-event'

export default reduxForm({
  form: 'newEvent',
  fields: ['name'],
  onSubmit: createEvent
})(NewEvent)
