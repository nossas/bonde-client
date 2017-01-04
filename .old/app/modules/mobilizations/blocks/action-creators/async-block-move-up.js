import { createAction } from './create-action'
import c from '../../../mobilizations/blocks/constants'

const asyncBlockMoveUp = ({ block, blocks, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks/${block.id}`
  const body = { block: { position: blocks[blocks.indexOf(block) - 1].position } }
  const config = { headers: credentials }

  dispatch({ type: c.REQUEST_ASYNC_BLOCK_MOVE_UP })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(c.SUCCESS_ASYNC_BLOCK_MOVE_UP, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(c.FAILURE_ASYNC_BLOCK_MOVE_UP, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockMoveUp
