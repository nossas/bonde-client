import * as actionTypes from './actionTypes'

const initialState = {
  total: 0,
  currentStep: 1,
  show: false
}

export default (state = initialState, action = {}) => {
  const { total, currentStep } = state
  switch (action.type) {
    case actionTypes.REGISTER_STEP:
      return {
        ...state,
        total: state.total + 1
      }
    case actionTypes.START:
      return {
        ...state,
        show: true
      }
    case actionTypes.DONE:
      return {
        ...state,
        show: false
      }
    case actionTypes.NEXT_STEP:
      return {
        ...state,
        currentStep: currentStep === total ? 1 : currentStep + 1
      }
    default:
      return state
  }
}
