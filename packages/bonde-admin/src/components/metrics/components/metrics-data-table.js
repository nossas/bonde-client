import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as formatNumberHelper from 'utils/format-number-helper'
import { MetricsCard } from 'components/metrics/components'

const Value = ({ loading, value }) => (
  loading
    ? <i className='fa fa-circle-o-notch fa-spin lightestgray' />
    : <b>{value}</b>
)

const MetricsDataTable = ({ data: { loading, ...data } }) => (
  <div>
    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#DD2396'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.unique.activists.title'
              defaultMessage='Ativistas'
            />
          }
          footer={
            <span>
              <FormattedMessage
                id='c--metrics.unique.activists.subtitle'
                defaultMessage='Total de ativistas únicos'
              />
              <br />&nbsp;
            </span>
          }
        >
          {formatNumberHelper.number(data.totalUniqueActivists)}
        </MetricsCard>
      </div>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#DD2396'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.active.activists.title'
              defaultMessage='Ativistas'
            />
          }
          footer={
            <span>
              <FormattedMessage
                id='c--metrics.total.active.activists.subtitle'
                defaultMessage='Total de ativistas ativos{br}nos últimos 90 dias'
                values={{
                  br: <br />
                }}
              />
            </span>
          }
        >
          {formatNumberHelper.number(data.totalUniqueActivistsLast90Days)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#40B4E5'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.pressure.actions.title'
              defaultMessage='Ações'
            />
          }
          footer={
            <span>
              <FormattedMessage
                id='c--metrics.total.pressure.actions.subtitle'
                defaultMessage='Total de ações de pressão {br} nos últimos 90 dias'
                values={{
                  br: <br />
                }}
              />
            </span>
          }
        >
          {formatNumberHelper.number(data.totalActivistsPressureLast90Days)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#40B4E5'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.subscriptions.actions.title'
              defaultMessage='Ações'
            />
          }
          footer={
            <FormattedMessage
              id='c--metrics.total.subscriptions.actions.subtitle'
              defaultMessage='Total de ações de assinatura {br} nos últimos 90 dias'
              values={{
                br: <br />
              }}
            />
          }
        >
          {formatNumberHelper.number(data.totalActivistsFormEntryLast90Days)}
        </MetricsCard>
      </div>
    </div>

    <div className='clearfix mxn1'>
      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.unique.donations.title'
              defaultMessage='Doações'
            />
          }
          footer={
            <FormattedMessage
              id='c--metrics.total.unique.donations.subtitle'
              defaultMessage='Valor total das doações únicas confirmadas nos últimos 30 dias'
            />
          }
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {formatNumberHelper.currency(data.totalUniqueDonationsAmountLastMonth)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-6 lg-col-3 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.recurrent.donations.title'
              defaultMessage='Doações'
            />
          }
          footer={
            <FormattedMessage
              id='c--metrics.total.recurrent.donations.subtitle'
              defaultMessage='Valor total das doações recorrentes confirmadas nos últimos 30 dias'
            />
          }
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {formatNumberHelper.currency(data.totalSubscriptionDonationsAmountLastMonth)}
        </MetricsCard>
      </div>

      <div className='mb2 col col-12 lg-col-6 px1'>
        <MetricsCard
          backgroundColor='#00C08A'
          loading={loading}
          title={
            <FormattedMessage
              id='c--metrics.total.unique-and-recurrent.donations.title'
              defaultMessage='Doações'
            />
          }
          footer={
            <FormattedMessage
              id='c--metrics.total.unique-and-recurrent.donations.subtitle'
              defaultMessage='Valor total de doações únicas e recorrentes até agora {br}(confirmadas / aguardando pagamento)'
              values={{
                br: <br />
              }}
            />
          }
          contentStyle={{ fontSize: '2.1vw', lineHeight: '2.2' }}
        >
          {formatNumberHelper.currency(data.totalDonationsPaidAmount)}
          {' / '}
          {formatNumberHelper.currency(data.totalDonationsWaitingPaymentAmount)}
        </MetricsCard>
      </div>
    </div>

    <table>
      <tbody>
        {data.totalDonationsChargedBackAmount > 0 && (
          <tr>
            <td>
              <FormattedMessage
                id='c--metrics.total.donations.charged-back-amount'
                defaultMessage='Valor total de devolução das doações coletadas até agora:'
              />
            </td>
            <td className='px2'>
              <Value
                loading={loading}
                value={formatNumberHelper.currency(data.totalDonationsChargedBackAmount)}
              />
            </td>
          </tr>
        )}
        {data.totalDonationsRefundedAmount > 0 && (
          <tr>
            <td>
              <FormattedMessage
                id='c--metrics.total.donations.refunded-amount'
                defaultMessage='Valor total de reembolso das doações coletadas até agora:'
              />
            </td>
            <td className='px2'>
              <Value
                loading={loading}
                value={formatNumberHelper.currency(data.totalDonationsRefundedAmount)}
              />
            </td>
          </tr>
        )}
        {data.totalDonationsRefusedAmount > 0 && (
          <tr>
            <td>
              <FormattedMessage
                id='c--metrics.total.donations.refused-amount'
                defaultMessage='Valor total das doações recusadas até agora:'
              />
            </td>
            <td className='px2'>
              <Value
                loading={loading}
                value={formatNumberHelper.currency(data.totalDonationsRefusedAmount)}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default MetricsDataTable
