import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BondeSessionProvider as Session } from "bonde-core-tools";
import { Loading } from "bonde-components";
import { useTranslation } from "react-i18next";
// Scenes to router
import Home from './scenes/Home';

type AppLoadingProps = {
  fetching: "session" | "user" | "communities" | "redirect" | "module"
};

const AppLoading = ({ fetching }: AppLoadingProps) => {
  const { t } = useTranslation("loading");

  const messages = {
    session: t("session"),
    user: t("user"),
    communities: t("communities"),
    // TODO: change this implementation
    redirect: t("redirect"),
    module: t("module"),
  };

  return <Loading fullsize message={messages[fetching]} />;
};

type Environment = "development" | "staging" | "production";

function App() {
  const envConfig: Environment =
    (process.env.REACT_APP_ENVIRONMENT || "development") as Environment;

  return (
    <React.Suspense fallback={Loading}>
      <Session fetchData environment={envConfig} loading={AppLoading}>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </Session>
    </React.Suspense>
  );
}

export default App;
