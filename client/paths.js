export const login = () => '/login'
export const logout = () => '/logout'

export const mobilizations = () => '/'
export const mobilization = (mobilization, domain = process.env.APP_DOMAIN) => {
  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}

export const newMobilization = () => '/mobilizations/new'
export const editMobilization = id => `/mobilizations/${id}/edit`
export const basicsMobilization = id => `/mobilizations/${id}/basics`
export const cityMobilization = id => `/mobilizations/${id}/city`
export const cityNewMobilization = id => `/mobilizations/${id}/cityNew`
export const sharingMobilization = id => `/mobilizations/${id}/sharing`
export const analyticsMobilization = id => `/mobilizations/${id}/analytics`
export const customDomainMobilization = id => `/mobilizations/${id}/customDomain`

export const fieldsMobilizationWidget = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/fields`
}
export const autofireMobilizationWidget = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/autofire`
}
export const exportWidgetData = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/export`
}

export const editAccount = () => '/account/edit'

//
// Interface to modules paths
//
export * from '~mobilizations/widgets/paths'
export * from '~mobilizations/blocks/paths'
export * from '~mobilizations/templates/paths'
