import { createAction } from '~client/utils/redux'
import * as t from '~client/subscriptions/redux/action-types'

export default index => createAction(t.REMOVE_ANIMATION_STACK, index)
