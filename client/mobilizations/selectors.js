export const getCurrent = (state, ownProps) => {
  const { list: { currentId, data } } = state.mobilization
  return data.filter(mob => mob.id === currentId)[0]
}

export const getTemplate = (state, ownProps) => {
  const { list: { data }, templates: { list: { templateId } } } = state.mobilization
  return data.filter(mob => mob.id === templateId)[0]
}

export const getList = state => state.mobilization.list.data

export const getMenuActiveIndex = state => state.mobilization.list.menuActiveIndex

export const isLoading = state => state.mobilization.list.loading

export const isLoaded = state => state.mobilization.list.isLoaded
