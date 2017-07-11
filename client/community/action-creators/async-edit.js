import * as t from '~client/community/action-types'

const asyncEdit = ({ id, ...community }) => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  // ensure that the document number value have only numbers
  if (community.recipient) {
    const { bank_account: bankAccount } = community.recipient
    const { document_number: documentNumber } = bankAccount
    community.recipient.bank_account = {
      ...bankAccount,
      document_number: String(documentNumber).replace(/\D/g, '')
    }
  }

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
