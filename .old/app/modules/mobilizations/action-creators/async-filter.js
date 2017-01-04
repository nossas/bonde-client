import * as t from '../../action-types'


export default query => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  dispatch({ type: t.REQUEST_FILTER })

  return axios
    .get('/mobilizations', query, { headers: credentials })
    .then(({ status, data }) => {

      if (status === 200) {
        dispatch({ type: t.SUCCESS_FILTER, data })
        return Promise.resolve()
      }

      return Promise.reject({ message: `Request code ${status}` })
    })
    .catch(err => dispatch({ type: t.FAILURE_FILTER, error: err.message }))
}
