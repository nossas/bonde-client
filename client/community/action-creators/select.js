import * as t from '~client/community/action-types'

const select = id => dispatch => {
  return dispatch({ type: t.SELECT, id })
}

export default select
