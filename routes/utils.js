export const showMobilizationPublicView = ({ host, domain }) => {
  return (isSubdomain(host, domain) || !isDomain(host, domain))
}

// eslint-disable-next-line
export const isSubdomain = (host, domain) => host.match(`(.+)\.${domain}`)
export const isDomain = (host, domain) => host.match(domain)

export const getDomain = (store, serverConfig) => {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain
  return { domain, host }
}
