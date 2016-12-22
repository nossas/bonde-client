export function login() {
  return `/login`
}

export function logout() {
  return `/logout`
}

export function mobilizations() {
  return `/`
}

export function mobilization(mobilization, domain = process.env.APP_DOMAIN) {
  if (domain.indexOf('staging') !== -1)
    return `http://${mobilization.slug}.${domain}`

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}

export function newMobilization() {
  return `/mobilizations/new`
}

export function editMobilization(id) {
  return `/mobilizations/${id}/edit`
}

export function basicsMobilization(id) {
  return `/mobilizations/${id}/basics`
}

export function cityMobilization(id) {
  return `/mobilizations/${id}/city`
}

export function cityNewMobilization(id) {
  return `/mobilizations/${id}/cityNew`
}

export function sharingMobilization(id) {
  return `/mobilizations/${id}/sharing`
}

export function analyticsMobilization(id) {
  return `/mobilizations/${id}/analytics`
}

export function customDomainMobilization(id) {
  return `/mobilizations/${id}/customDomain`
}

export function newMobilizationBlock(mobilization_id) {
  return `/mobilizations/${mobilization_id}/blocks/new`
}

export function fieldsMobilizationWidget(mobilization_id, widget_id) {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/fields`
}

export function formMobilizationWidget(mobilization_id, widget_id) {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/form`
}

export function autofireMobilizationWidget(mobilization_id, widget_id) {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/autofire`
}

export const exportWidgetData = (mobilization_id, widget_id) => {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/export`
}

export function donationMobilizationWidget(mobilization_id, widget_id) {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/donation`
}

export * from './Widget/plugins/Match/paths'
export * from './Mobilization/plugins/Templates/MobilizationTemplatesPaths'

const makePressureWidget = (mobilization_id, widget_id, path) =>
  `/mobilizations/${mobilization_id}/widgets/${widget_id}/pressure${path}`

export const formPressureWidget = (mid, wid) => makePressureWidget(mid, wid, '/form')
export const emailPressureWidget = (mid, wid) => makePressureWidget(mid, wid, '/email')

export function editAccount() {
  return `/account/edit`
}
