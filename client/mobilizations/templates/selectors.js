export const isLoading = state => state.mobilization.templates.list.loading

export const isLoaded = state => state.mobilization.templates.list.isLoaded

export const getGlobalTemplates = state => state.mobilization.templates.list.global

export const getCustomTemplates = state => state.mobilization.templates.list.custom

export const getFilterableTemplates = state => state.mobilization.templates.filterable.list

export const getSelectableIndex = state => state.mobilization.templates.selectable.selectedIndex
