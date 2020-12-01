import React from "react";
import {
  Navigation,
  Tab,
  Header as Heading,
  SubHeader,
} from "bonde-components";
import { Link, useRouteMatch } from "react-router-dom";

const Header = (): React.ReactElement => (
  <SubHeader>
    <Heading.H3>Redes</Heading.H3>
    <Navigation>
      <Link to="/">
        <Tab
          active={
            !!useRouteMatch({
              path: "/",
              exact: true,
            })
          }
        >
          Início
        </Tab>
      </Link>
      <Link to="/pessoas">
        <Tab
          active={
            !!useRouteMatch({
              path: "/pessoas",
              exact: false,
            })
          }
        >
          Pessoas
        </Tab>
      </Link>
      <Link to="/matches">
        <Tab
          active={
            !!useRouteMatch({
              path: "/matches",
              exact: false,
            })
          }
        >
          Relações
        </Tab>
      </Link>
      <Link to="/configuracoes/match">
        <Tab
          active={
            !!useRouteMatch({
              path: "/configuracoes/match",
              exact: false,
            })
          }
        >
          Configurações
        </Tab>
      </Link>
    </Navigation>
  </SubHeader>
);

export default Header;
