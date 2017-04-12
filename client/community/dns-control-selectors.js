export const isLoaded = state => state.community.dnsHostedZones.isLoaded
export default (state, props) => ({

  dnsHostedZones: (dnsHostedZones = state.community.dnsHostedZones) => ({
    isLoaded: () => dnsHostedZones.isLoaded,
    isLoading: () => dnsHostedZones.fetching,
    getList: () => dnsHostedZones.data,
    isSaving: () => dnsHostedZones.saving,
    get: (id) => dnsHostedZones.data.filter(d => d.id === parseInt(id))[0]
  }),
})
