import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as notificationsReducer } from 'reapop'
import auth from '~client/account/redux/reducers'
import mobilizations from '~client/mobrender/redux/reducers'
/*
import mobilizations from '~mobilizations/reducers'
import blocks from '~mobilizations/blocks/reducers'
import widgets from '~mobilizations/widgets/reducers'
*/
import community from '~community/reducers'
import colorPicker from '~components/color-picker/reducers'

const initialState = {
  host: '',
  protocol: ''
}

const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    form: formReducer,
    notifications: notificationsReducer(),
    auth,
    mobilizations,
    community,
    colorPicker,
    ...asyncReducers
  })
}
