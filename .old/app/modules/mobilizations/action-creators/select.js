import * as t from '../action'

export default id => dispatch => {
  dispatch({
    type: t.SELECT,
    currentId: !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : undefined
  })
}
