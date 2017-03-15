import { provideHooks } from 'redial'

import AccountSelectors from '~client/account/redux/selectors'
import * as AccountActions from '~client/account/redux/action-creators'

import Container from './container'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []
    if (AccountSelectors(state).isLoaded()) {
      promises.push(dispatch(AccountActions.load()))
    }

    return Promise.all(promises)
  }
}

export default provideHooks(redial)(Container)
