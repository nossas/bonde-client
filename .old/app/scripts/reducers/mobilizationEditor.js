export const START_EDITING_BLOCK = 'START_EDITING_BLOCK'
export const STOP_EDITING_BLOCK = 'STOP_EDITING_BLOCK'

const initialState = {
  isEditingBlock: false
}

export default function mobilizationEditor(state = initialState, action) {
  switch (action.type) {
    case START_EDITING_BLOCK:
      return {...state, isEditingBlock: true}
    case STOP_EDITING_BLOCK:
      return {...state, isEditingBlock: false}
    default:
      return state
  }
}

export function startEditingBlock() {
  return { type: START_EDITING_BLOCK }
}

export function stopEditingBlock() {
  return { type: STOP_EDITING_BLOCK }
}
