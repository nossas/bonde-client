import { createAction } from '~client/utils/redux'
import * as t from '~client/subscriptions/redux/action-types'

export default form => createAction(t.APPEND_ANIMATION_STACK, form)
