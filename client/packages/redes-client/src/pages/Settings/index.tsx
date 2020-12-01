import { Header } from "bonde-components";
import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { MatchSettings } from "./scenes";

type Settings = {
  id?: number;
  settings: {
    volunteer_msg: string;
    individual_msg: string;
  };
  name?: string;
  version?: string;
  community_id?: number;
};

const Settings = (): React.ReactElement => {
  const { path } = useRouteMatch();
  const { groups } = useCommunityExtra();

  return (
    <div style={{ width: "100%" }}>
      {/* <Navigation>
        <NavLink to={`${url}/match`} activeClassName="active">
          Match
        </NavLink>
      </Navigation> */}
      <Switch>
        <Route path={`${path}/match`}>
          {groups.length < 1 ? (
            <Header.H4>
              Para adicionar uma comunicação a comunidade precisa ter pelo menos um grupo configurado.
            </Header.H4>
          ) : (
            <MatchSettings groups={groups} />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default Settings;
