import { createAction } from '~client/utils/redux'
import * as t from '~client/subscriptions/redux/action-types'

export default modificationType => createAction(t.SET_MODIFICATION_TYPE, modificationType)
