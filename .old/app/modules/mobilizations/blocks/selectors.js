export const getWidgets = ({ widgets, block }) => widgets.filter(
  widget => widget.block_id === block.id
)

export const isLoaded = state => state.blocks.loaded
