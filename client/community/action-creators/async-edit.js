import * as t from '~client/community/action-types'

const asyncEdit = ({ id, ...community }) => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  return api
    .put(`/communities/${id}`, { community }, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.EDIT, community: data })
        return Promise.resolve()
      }
    })
    .catch(error => Promise.reject(error))
}

export default asyncEdit
