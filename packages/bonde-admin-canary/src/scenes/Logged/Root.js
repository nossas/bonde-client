import React from 'react'
import { AuthProvider, Route } from 'services/auth'
import { LoadingFullScreen } from 'components/Loadable'
import HomeModule from './scenes/Home'
import TagsPage from './scenes/Tags'
import ChatbotModule from './scenes/Chatbot'

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

export default Root
