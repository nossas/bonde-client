import { reset } from 'redux-form'
import { store } from 'services/redux'

export default () => store.dispatch(reset('components/Form'))
