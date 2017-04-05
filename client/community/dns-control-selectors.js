export const isLoaded = state => state.community.dnsHosted.isLoaded
export const isLoading = state => state.community.dnsHosted.fetching
export const getHosts = state => state.community.dnsHosted.data
