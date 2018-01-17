import * as CommunitySelectors from '~client/community/selectors'
import downloadjs from 'downloadjs'

export default (ids, filename) => (dispatch, getState, { api }) => {
  const communityId = CommunitySelectors.getCurrentId(getState())
  const { auth: { credentials } } = getState()
  return api
    .post(`/communities/${communityId}/download_activists.csv`, { list_id: ids }, { headers: credentials })
    .then(({ data }) => {
      downloadjs(new Blob([data]), `[Ativistas] ${filename}.csv`, 'text/csv')
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error({ _error: error }))
    })
}
