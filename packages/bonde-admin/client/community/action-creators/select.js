import * as t from '~client/community/action-types'
import * as CommunitySelectors from '~client/community/selectors'

const select = id => (dispatch, getState) => {
  const state = getState()

  // Save selected community into browser's localStorage
  if (CommunitySelectors.getCurrentId(state) !== id) {
    window.localStorage.setItem('community', JSON.stringify({
      list: {
        data: [CommunitySelectors.getList(state).filter(c => c.id === id)[0]],
        currentId: id
      }
    }))
  }

  return dispatch({ type: t.SELECT, id })
}

export default select
