export function login () {
  return `/login`
}

export function logout () {
  return `/logout`
}

export function mobilizations () {
  return `/`
}

export function mobilization (mobilization, domain = process.env.APP_DOMAIN) {
  if (domain && domain.indexOf('staging') !== -1) {
    return `http://${mobilization.slug}.${domain}`
  }

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}

export function newMobilization () {
  return `/mobilizations/new`
}

export function editMobilization (id) {
  return `/mobilizations/${id}/edit`
}

export function basicsMobilization (id) {
  return `/mobilizations/${id}/basics`
}

export function cityMobilization (id) {
  return `/mobilizations/${id}/city`
}

export function cityNewMobilization (id) {
  return `/mobilizations/${id}/cityNew`
}

export function sharingMobilization (id) {
  return `/mobilizations/${id}/sharing`
}

export function analyticsMobilization (id) {
  return `/mobilizations/${id}/analytics`
}

export function customDomainMobilization (id) {
  return `/mobilizations/${id}/customDomain`
}

export function fieldsMobilizationWidget (mobilizationId, widgetId) {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/fields`
}

export function autofireMobilizationWidget (mobilizationId, widgetId) {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/autofire`
}

export const exportWidgetData = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/export`
}

export function editAccount () {
  return `/account/edit`
}

//
// Interface to modules paths
//
export * from '../modules/widgets/paths'
export * from './Mobilization/plugins/Templates/MobilizationTemplatesPaths'
export * from '../modules/mobilizations/blocks/paths'
