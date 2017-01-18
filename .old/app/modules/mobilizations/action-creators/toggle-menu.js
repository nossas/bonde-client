import * as t from '../action-types'

export default id => dispatch => {
  dispatch({
    type: t.TOGGLE_MENU,
    payload: !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : undefined
  })
}
