export const getList = state => state.community.list.data
export const getCurrentId = state => state.community.list.currentId
export const isLoaded = state => state.community.list.isLoaded
export const isLoading = state => state.community.list.loading
export const isForcedSubmit = state => state.community.list.forcedSubmit

export const getCurrent = state => getList(state).filter(c => c.id === getCurrentId(state))[0]
