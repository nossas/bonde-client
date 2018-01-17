import { gql } from 'react-apollo'

export default gql`
query metricsMobilization($mobilizationId: Int!) {
  totalUniqueActivists:
    totalUniqueActivistsByMobilization(
      mobId: $mobilizationId
    )
  totalUniqueActivistsLast90Days:
    totalUniqueActivistsByMobilizationInterval(
      mobId: $mobilizationId
      timeinterval: { days: 90 }
    )
  totalActivistsPressureLast90Days:
    totalUniqActivistsByKindAndMobilizationInterval(
      mobId: $mobilizationId
      kindName: "activist_pressure"
      timeinterval: { days: 90 }
    )
  totalActivistsFormEntryLast90Days:
    totalUniqActivistsByKindAndMobilizationInterval(
      mobId: $mobilizationId
      kindName: "form_entry"
      timeinterval: { days: 90 }
    )
  totalDonationsChargedBackAmount:
    totalSumDonationsFromMobilization(
      mobId: $mobilizationId
      status: "chargedback"
    )
  totalDonationsPaidAmount:
    totalSumDonationsFromMobilization(
      mobId: $mobilizationId
      status: "paid"
    )
  totalDonationsRefundedAmount:
    totalSumDonationsFromMobilization(
      mobId: $mobilizationId
      status: "refunded"
    )
  totalDonationsRefusedAmount:
    totalSumDonationsFromMobilization(
      mobId: $mobilizationId
      status: "refused"
    )
  totalDonationsWaitingPaymentAmount:
    totalSumDonationsFromMobilization(
      mobId: $mobilizationId
      status: "waiting_payment"
    )
  totalSubscriptionDonationsAmountLastMonth:
    totalSumSubscriptionDonationsFromMobilizationInterval(
      mobId: $mobilizationId
      status: "paid"
      timeinterval: { months: 1 }
    )
  totalUniqueDonationsAmountLastMonth:
    totalSumUniqDonationsFromMobilizationInterval(
      mobId: $mobilizationId
      status: "paid"
      timeinterval: { months: 1 }
    )
}
`
