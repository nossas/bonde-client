//
// @route /mobilizations/:mobilization_id/widgets/:widget_id/pressure
//
import React from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import * as graphqlQueries from 'graphql/queries'
import { Warning } from 'components/notify'
import { Loading } from 'components/await'
import { Button } from 'ux/components'
import { adjustmentsForm, AdjustmentsSettingsForm } from 'mobrender/widgets/adjustments'
import MobSelectors from 'mobrender/redux/selectors'
import * as CommunitySelectors from 'community/selectors'
import * as MobActions from 'mobrender/redux/action-creators'
import * as Paths from 'paths'

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget(),
    communityId: CommunitySelectors.getCurrentId(state)
  }
}

const mapDispatchToProps = {
  asyncWidgetUpdate: MobActions.asyncUpdateWidget
}

const SettingsForm = injectIntl(
  adjustmentsForm({ formName: 'pressureAdjustsForm' })(
    AdjustmentsSettingsForm
  )
)

const FormWithGraphql = graphql(graphqlQueries.fetchTwilioConfiguration, {
  options: ({ communityId }) => ({
    fetchPolicy: 'network-only',
    variables: { communityId }
  }),
  props: ({ ownProps, data: { configs, loading } }) => {
    const [config] = (configs && configs.list) || []
    const isConfigPreexists = !!config
    return { isConfigPreexists, loading, ...ownProps }
  }
})(({ isConfigPreexists, loading, ...props }) => {
  return (
    <div>
      {loading && (<Loading />)}
      {!isConfigPreexists && !loading && props.widget.kind === 'pressure-phone' && (
        <Warning
          title={(
            <FormattedMessage
              id='page--widgets-pressure--adjustmens.warning.title'
              defaultMessage='Falta pouco!'
            />
          )}
        >
          <FormattedMessage
            id='page--widgets-pressure--adjustmens.warning.content'
            defaultMessage={
              'Para liberar a Pressão por Telefone, o Bonde se juntou com o Twilio, uma plataforma ' +
              'online de comunicação. Pensa numa integração boa! Por isso, pra começar a causar por ' +
              'telefone é preciso configurar uma conta Twilio na sua comunidade.{linebreak}' +
              'Bora lá?'
            }
            values={{
              linebreak: <br />
            }}
          />
          <br />
          <Button btnStyles={{ margin: '15px 0 0' }} to={Paths.communityTwilio()}>
            <FormattedMessage
              id='page--widges-pressure--adjustments-warning.button'
              defaultMessage='Bora lá'
            />
          </Button>
        </Warning>
      )}
      <SettingsForm {...props} />
    </div>
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(FormWithGraphql)
