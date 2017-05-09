import { addNotification } from 'reapop'
import * as notifications from '~client/utils/notifications'
import { createAction } from './create-action'
import * as t from '../action-types'
import AnalyticsEvents from '~client/mobilizations/widgets/utils/analytics-events'

const asyncDonationTransactionCreate = params => (dispatch, getState, { api }) => {
  const endpoint = `/mobilizations/${params.mobilization_id}/donations`
  const body = { donation: genRequestPayload(params) }

  dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST })
  return api.post(endpoint, body)
    .then(response => {
      dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS })

      AnalyticsEvents.donationFinishRequest()

      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE, failure))
      dispatch(addNotification(notifications.genericRequestError()))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncDonationTransactionCreate

const genRequestPayload = params => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period
})
