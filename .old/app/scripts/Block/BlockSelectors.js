// Selectors

export const getBlocks = (state, mobilizationId) => {
  return state.blocks.data.filter(block => block.mobilization_id === mobilizationId)
}
