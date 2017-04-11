export const isLoaded = state => state.community.dnsHosted.isLoaded
export const isLoading = state => state.community.dnsHosted.fetching
export const getDomains = state => state.community.dnsHosted.data
export const isSaving = state => state.community.dnsHosted.saving
export const getDomain = (state, dns_id) => getDomains(state).filter(d => d.id === parseInt(dns_id))[0]
