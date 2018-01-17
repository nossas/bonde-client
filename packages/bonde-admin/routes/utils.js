import AccountSelectors from '~client/account/redux/selectors'
import * as CommunitySelectors from '~client/community/selectors'
import * as paths from '~client/paths'

export const showMobilizationPublicView = ({ host, domain }) => {
  return (isSubdomain(host, domain) || !isDomain(host, domain))
}

export const isSubdomain = (host, domain) => {
  if (host.indexOf('app.') !== -1) return false
  // eslint-disable-next-line
  return host.match(`(.+)\.${domain}`)
}
export const isDomain = (host, domain) => host.match(domain)

export const getDomain = (store, serverConfig) => {
  const { sourceRequest: { host } } = store.getState()
  const domain = serverConfig.appDomain
  return { domain, host }
}

export const isIndexRedirected = (store) => (nextState, replace) => {
  const credentials = AccountSelectors(store.getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(store.getState())

  if (!credentials) {
    replace(paths.login())
  } else if (!community) {
    replace(paths.communityList())
  } else {
    replace(paths.mobilizations())
  }
}

export const IsCommunitySelected = (store) => (nextState, replace) => {
  const community = CommunitySelectors.getCurrent(store.getState())
  if (!community) {
    replace(paths.communityList())
  }
}

export const UserIsLogged = (store) => (nextState, replace) => {
  const credentials = AccountSelectors(store.getState()).getCredentials()

  if (!credentials) {
    replace(paths.login())
  }
}
