import React from 'react'
import { AuthProvider, Route } from 'services/auth'
import { LoadingFullScreen } from 'components/Loadable'
import HomeModule from './scenes/Home'
import TagsPage from './scenes/Tags'
import ChatbotModule from './scenes/Chatbot'
import PropTypes from 'prop-types'

const Root = ({ match }) => (
  <AuthProvider loading={LoadingFullScreen}>
    <Route
      exact
      path={match.url}
      component={HomeModule}
    />

    <Route
      path={`${match.url}/tags`}
      component={TagsPage}
    />

    <Route
      path={`${match.url}/:id/chatbot`}
      component={ChatbotModule}
    />
  </AuthProvider>
)

Root.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

export default Root
