import React from "react";
import styled from "styled-components";
import { Tab, Header } from "bonde-components";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import Container, { NavigationArgs } from "../Container";
import { Widget } from "../FetchWidgets";
import Labels from "../Labels";
import TabRoute from "../TabRoute";
import ConfigurePressureTargets from "../ConfigurePressureTargets";
import AutofireForm from "../AutofireForm";
import { useTranslation } from "react-i18next";

const Tabs = styled.div`
  ${Tab} {
    color: #424242;

    &:hover,
    &.active,
    &:active,
    &:focus {
      color: #ee0099;
      border: none;
      outline: none;
      padding: 0;
    }
  }
`;

type Props = {
  widgets: Widget[];
};

const Settings = ({ widgets }: Props) => {
  const match = useRouteMatch();
  const { widgetId } = useParams();
  const { t } = useTranslation("widget");

  const widget = widgets.filter((w: Widget) => w.id === Number(widgetId))[0];

  if (!widget) return <Header.H2>Nenhum widget encontrado</Header.H2>;

  const label = Labels.get(widget.kind);
  console.log("match", { match });

  return (
    <Container
      title={widget.block.mobilization.name}
      navigation={({ push, is }: NavigationArgs) => (
        <>
          <Tab onClick={() => console.log("redirect to edit")}>Editar</Tab>
          <Tab
            active={is(/\/widgets\/\d+\/settings\/*/)}
            onClick={() => push(`settings`)}
          >
            Configurações
          </Tab>
        </>
      )}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12}>
          <Header.H3>{`Configurar ${label.title.toLowerCase()}`}</Header.H3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <TabRoute>
            {({ push, is }) => (
              <Tabs>
                <Tab
                  className={is(/\/widgets\/\d+\/settings\/*$/) ? "active" : ""}
                  onClick={() => push("")}
                >
                  {t("settings.navigation.settings")}
                </Tab>
                <Tab
                  className={
                    is(/\/widgets\/\d+\/settings\/adjusts\/*$/) ? "active" : ""
                  }
                  onClick={() => push(`/adjusts`)}
                >
                  {t("settings.navigation.adjusts")}
                </Tab>
                <Tab
                  className={
                    is(/\/widgets\/\d+\/settings\/autofire\/*$/) ? "active" : ""
                  }
                  onClick={() => push(`/autofire`)}
                >
                  {t("settings.navigation.autofire")}
                </Tab>
                <Tab
                  className={
                    is(/\/widgets\/\d+\/settings\/finish\/*$/) ? "active" : ""
                  }
                  onClick={() => push(`/finish`)}
                >
                  {t("settings.navigation.finish")}
                </Tab>
              </Tabs>
            )}
          </TabRoute>
        </Col>
        <Col xs={12}>
          <Switch>
            <Route exact path={`${match.path}`}>
              {widget.kind === "pressure" && (
                <ConfigurePressureTargets widgetId={widgetId} />
              )}
            </Route>
            <Route exact path={`${match.path}/adjusts`}>
              <Header.H4>Ajustes</Header.H4>
            </Route>
            <Route exact path={`${match.path}/autofire`}>
              <AutofireForm widget={widget} />
            </Route>
            <Route exact path={`${match.path}/finish`}>
              <Header.H4>Pós-ação</Header.H4>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
