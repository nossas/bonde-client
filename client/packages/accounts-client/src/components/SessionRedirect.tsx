import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { useSession } from 'bonde-core-tools';

interface SessionRedirectProps {
  paths: string[];
  to: string;
  loading: any;
}

const SessionRedirect: React.FC<SessionRedirectProps> = ({ children, loading: Loading, paths, to }) => {
  const { isLogged } = useSession();
  const location = useLocation();

  const isRendered = !(isLogged && paths.filter((path: string) => location.pathname === path).length > 0);
  // if (!isRendered) {
  //   console.log('redirect to app :8181');
  //   window.location.href = to;
  // }

  return isRendered ? (
    <Switch>
      {children}
    </Switch>
  ) : <Loading fetching='redirect' />;
};

SessionRedirect.defaultProps = {
  paths: []
};

export default SessionRedirect;