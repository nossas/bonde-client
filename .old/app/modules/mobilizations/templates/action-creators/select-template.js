import * as t from '../action-types'

export default mobilization_id => dispatch => dispatch({ type: t.SELECT_TEMPLATE, payload: mobilization_id })
