import * as actionTypes from './actionTypes'

export const onNext = () => (dispatch) => dispatch({ type: actionTypes.NEXT_STEP })
export const register = () => (dispatch) => dispatch({ type: actionTypes.REGISTER_STEP })
export const onFinish = () => (dispatch) => dispatch({ type: actionTypes.DONE })
export const onStart = () => (dispatch) => dispatch({ type: actionTypes.START })
