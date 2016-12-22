export const getWidget = (state, props) => {
  const { params: { widget_id } } = props
  return state.widgets.data.filter(widget => widget.id === parseInt(widget_id))[0]
}

