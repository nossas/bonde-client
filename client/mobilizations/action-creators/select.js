import * as t from '../action-types'

export default id => dispatch => {
  dispatch({
    type: t.SELECT,
    payload: !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : undefined
  })
}
