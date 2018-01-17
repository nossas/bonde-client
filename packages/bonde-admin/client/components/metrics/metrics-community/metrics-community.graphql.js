import { gql } from 'react-apollo'

export default gql`
query metricsCommunity($communityId: Int!) {
  totalUniqueActivists:
    totalUniqueActivistsByCommunity(
      comId: $communityId
    )
  totalUniqueActivistsLast90Days:
    totalUniqueActivistsByCommunityInterval(
      comId: $communityId
      timeinterval: { days: 90 }
    )
  totalActivistsPressureLast90Days:
    totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "activist_pressure"
      timeinterval: { days: 90 }
    )
  totalActivistsFormEntryLast90Days:
    totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "form_entry"
      timeinterval: { days: 90 }
    )
  totalDonationsChargedBackAmount:
    totalSumDonationsFromCommunity(
      comId: $communityId
      status: "chargedback"
    )
  totalDonationsPaidAmount:
    totalSumDonationsFromCommunity(
      comId: $communityId
      status: "paid"
    )
  totalDonationsRefundedAmount:
    totalSumDonationsFromCommunity(
      comId: $communityId
      status: "refunded"
    )
  totalDonationsRefusedAmount:
    totalSumDonationsFromCommunity(
      comId: $communityId
      status: "refused"
    )
  totalDonationsWaitingPaymentAmount:
    totalSumDonationsFromCommunity(
      comId: $communityId
      status: "waiting_payment"
    )
  totalSubscriptionDonationsAmountLastMonth:
    totalSumSubscriptionDonationsFromCommunityInterval(
      comId: $communityId
      status: "paid"
      timeinterval: { months: 1 }
    )
  totalUniqueDonationsAmountLastMonth:
    totalSumUniqDonationsFromCommunityInterval(
      comId: $communityId
      status: "paid"
      timeinterval: { months: 1 }
    )
}
`
