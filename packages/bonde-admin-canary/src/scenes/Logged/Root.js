import React from 'react'
import { AuthProvider, Route } from 'services/auth'
import { FullScreenLoadable, LoadingFullScreen } from 'components/Loadable'
import TagsPage from './scenes/Tags'
import ChatbotPage from './scenes/Chatbot'

const HomePage = FullScreenLoadable({
  loader: () => import('./scenes/Home')
})

const Root = ({ match }) => (
  <AuthProvider loading={LoadingFullScreen}>
    <Route
      exact
      path={match.url}
      component={HomePage}
    />

    <Route
      path={`${match.url}/tags`}
      component={TagsPage}
    />

    <Route
      path={`${match.url}/chatbot`}
      component={ChatbotPage}
    />
  </AuthProvider>
)

export default Root
