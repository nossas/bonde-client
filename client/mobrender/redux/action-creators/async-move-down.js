import * as t from '../action-types'
import { createAction } from './create-action'

import AuthSelectors from '~client/account/selectors'
import Selectors from '../selectors'

export default block => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const mobilization = Selectors(getState()).getMobilization()
  const blocks = Selectors(getState()).getBlocks()

  const body = {
    block: {
      ...block,
      position: blocks[blocks.indexOf(
        blocks.filter(b => b.id === block.id
      )[0]) + 1].position
    }
  }

  dispatch(createAction(t.UPDATE_BLOCK_REQUEST))
  return api
    .put(`/mobilizations/${mobilization.id}/blocks/${block.id}`, body, { headers })
    .then(res => {
      dispatch(createAction(t.UPDATE_BLOCK_SUCCESS, res.data))
      dispatch(createAction(t.MOVE_BLOCK_DOWN, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
