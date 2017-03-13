import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as CommunityActions from '~community/action-creators'
import * as CommunitySelectors from '~community/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState }) => {
    const state = getState()
    const promises = []

    !CommunitySelectors.isLoaded(state) && promises.push(
      dispatch(CommunityActions.asyncFetch())
    )
    !CommunitySelectors.getCurrentId(state) && promises.push(
      dispatch(CommunityActions.select(1))
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = state => ({
  initialValues: { ...CommunitySelectors.getCurrent(state) }
})

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: 'mailchimpForm',
      fields: ['id', 'mailchimp_api_key', 'mailchimp_list_id', 'mailchimp_group_id']
    })(Page)
  )
)
