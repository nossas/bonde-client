// import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as CommunityActions from '~community/action-creators'
import * as CommunitySelectors from '~community/selectors'

import Page from './page'

// const redial = {
//   fetch: ({ dispatch, getState }) => {
//     const state = getState()
//     const promises = []
//
//     // !CommunitySelectors.isLoaded(state) && promises.push(
//     //   dispatch(CommunityActions.asyncFetch())
//     // )
//     // !CommunitySelectors.getCurrentId(state) && promises.push(
//     //   dispatch(CommunityActions.select(1))
//     // )
//     return Promise.all(promises)
//   }
// }

const mapStateToProps = state => {
  const community = CommunitySelectors.getCurrent(state)
  return {
    community,
    initialValues: { ...community }
  }
}

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit,
  downloadActivists: CommunityActions.asyncDownloadActivists
}

const fields = ['id', 'image', 'name', 'city', 'description']

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Informe o nome da comunidade'
  }
  if (!values.city) {
    errors.city = 'Informe em qual cidade sua comunidade atua'
  }
  return errors
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ form: 'communityInfoForm', fields, validate })(Page)
  )
)
