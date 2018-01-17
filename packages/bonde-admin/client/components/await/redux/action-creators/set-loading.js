import { createAction } from '~client/utils/redux'
import * as t from '../action-types'

export default loading => createAction(t.SET_LOADING, loading)
