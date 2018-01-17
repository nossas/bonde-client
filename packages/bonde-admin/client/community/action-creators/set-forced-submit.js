import { createAction } from '~client/utils/redux'
import * as t from '~client/community/action-types'

export default force => createAction(t.SET_FORCED_SUBMIT, force)
