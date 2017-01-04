import { TRANSACTION_DONE } from '../../../constants/ActionTypes'
import $ from 'jquery'

export function finishTransaction (params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/donations`, {
      method: 'post',
      data: {
        donation: {
          widget_id: params.widget_id,
          card_hash: params.card_hash,
          payment_method: params.payment_method,
          amount: params.amount,
          customer: params.customer,
          subscription: params.subscription,
          period: params.recurring_period
        }
      },
      success: function (data, textStatus, jqXHR) {
        dispatch({
          type: TRANSACTION_DONE,
          data
        })
      }
    })
  }
}
