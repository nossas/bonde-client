import * as t from '../action-types'

export default mobilization => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  return axios
    .post('/mobilizations', { mobilization }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.ADD, payload: data })
        return Promise.resolve()
      } else {
        return Promise.reject({ error: `Response code ${status}` })
      }
    })
    .catch(error => dispatch({ type: 'LOG', error }))
}
