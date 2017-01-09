import * as t from '../../action-types'

export default relationshipId => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  dispatch({ type: t.REQUEST_FETCH, relationshipId })

  return axios
    .get(`/communities/${relationshipId}/mobilizations`)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.SUCCESS_FETCH, data })
        return Promise.resolve()
      }
      return Promise.reject({ message: `Response code ${status}` })
    })
    .catch(err => dispatch({ type: t.FAILURE_FETCH, error: err.message }))
}
