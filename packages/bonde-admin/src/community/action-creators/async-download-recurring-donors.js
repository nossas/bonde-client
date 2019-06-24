/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { addNotification as notify, removeNotification as dismiss } from 'reapop'
import * as notifications from 'utils/notifications'

const asyncDownloadRecurringDonors = ({ id, name }) => (dispatch, getState, { api, intl }) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/communities/${id}/download_subscriptions.csv`
  const body = {}
  const options = { headers: credentials }

  const filename = `[Relatório][DoadoresRecorrentes] ${name}.csv`
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
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        notifyError()
        return Promise.reject(false)
      } else if (status === 200) {
        if (data.length > 0) {
          notifySuccess()
          downloadjs(new Blob([data]), filename, 'text/csv')
          return Promise.resolve(true)
        }
      }
    })
    .catch(() => {
      notifyError()
      return Promise.reject(false)
    })
}

export default asyncDownloadRecurringDonors
