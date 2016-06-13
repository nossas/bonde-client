export function login() {
  return `/login`
}

export function logout() {
  return `/logout`
}

export function mobilizations(id) {
  return `/`
}

export function mobilization(mobilization, domain = process.env.APP_DOMAIN) {
  return (
    mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
  )
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

export function fontsMobilization(id) {
  return `/mobilizations/${id}/fonts`
}

export function customDomainMobilization(id) {
  return `/mobilizations/${id}/customDomain`
}

export function donationListMobilization(mobilization_id) {
  return `/mobilizations/${mobilization_id}/donations`
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

export function donationMobilizationWidget(mobilization_id, widget_id) {
  return `/mobilizations/${mobilization_id}/widgets/${widget_id}/donation`
}
