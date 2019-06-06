/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { addNotification as notify, removeNotification as dismiss } from 'reapop'
import * as notifications from 'utils/notifications'

const asyncDownloadDonations = ({ id, name, ...community }) => (dispatch, getState, { api, intl }) => {
  const { auth: { credentials } } = getState()

  const filename = `[Relatório][Doação] ${name}.csv`
  const notificationId = Math.random()
  const notifySuccess = () => {
    dispatch(notify(notifications.reportDownloadSuccess(intl, { filename })))
    dispatch(dismiss(notificationId))
  }
  const notifyError = () => {
    dispatch(notify(notifications.reportDownloadError(intl, { filename })))
    dispatch(dismiss(notificationId))
  }

  const warningOptions = { filename, notificationId }
  dispatch(notify(notifications.reportDownloadInProgressWarning(intl, warningOptions)))

  return api
    .get(`/communities/${id}/donation_reports.csv`, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        notifyError()
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          notifySuccess()
          downloadjs(new Blob([data]), filename, 'text/csv')
          return Promise.resolve()
        }
      }
    })
    .catch(error => {
      notifyError()
      Promise.reject(error)
    })
}

export default asyncDownloadDonations
