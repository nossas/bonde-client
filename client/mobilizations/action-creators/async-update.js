import * as t from '../action-types'

export default ({ id, template_mobilization_id, ...mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  return axios
    .put(`/mobilizations/${id}`, { mobilization, template_mobilization_id }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.UPDATE, payload: data })
        return Promise.resolve()
      } else {
        return Promise.reject({ error: `Response code ${status}` })
      }
    })
    .catch(error => dispatch({ type: 'LOG', error }))
}
