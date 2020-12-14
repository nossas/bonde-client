import React, { useState } from "react";
import { css } from "styled-components/macro";
import {
  Card,
  Header,
  ConnectedForm,
  InputField,
  Button,
  Label,
} from "bonde-components";
import { useMutation } from "bonde-core-tools";
import UPDATE_WIDGET_SETTINGS from "../UpdateWidgetSettings";
import Popups from "./Popups";
import PressureTargets from "./PressureTargets";
import { PressureTarget as PressureTargetsType } from "./FetchPressureTargets";

type Form = {
  subject: string;
  body: string;
};

type Props = {
  widgetId: number;
};

const GroupTargetsForm = ({ widgetId }: Props): React.ReactElement => {
  const [modalType, setModal] = useState<
    "insert" | "update" | "delete" | undefined
  >();
  const [pressureTarget, setPressureTarget] = useState<
    PressureTargetsType | undefined
  >();
  const [saveUniqueTargets] = useMutation(UPDATE_WIDGET_SETTINGS);
  const onSubmit = async (widgetId: number, { subject, body }: Form) => {
    try {
      await saveUniqueTargets({
        variables: {
          id: { _eq: widgetId },
          settings: {
            pressure_subject: subject,
            pressure_body: body,
          },
        },
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify(e);
    }
  };
  return (
    <>
      <Card padding={{ x: 40, y: 30 }}>
        <Header.H4 style={{ marginBottom: "15px" }}>Definir alvos</Header.H4>
        <ConnectedForm onSubmit={(e) => onSubmit(widgetId, e)}>
          {({ submitting }: any) => (
            <>
              <div
                css={css`
                  position: absolute;
                  top: -180px;
                  left: 1070px;
                  width: 150px;
                `}
              >
                <Button type="submit" disabled={submitting}>
                  Salvar
                </Button>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-row-gap: 20px;
                `}
              >
                <InputField
                  name="name"
                  placeholder="Ex: Selecione seu estado"
                  label="NOME DO CAMPO DE SELEÇÃO"
                />
                <Label>
                  ADICIONAR GRUPO DE ALVOS
                  <div
                    css={css`
                      border: 1px solid #eee;
                      margin-bottom: 15px;
                      height: 60px;
                      display: flex;
                    `}
                  >
                    <Button onClick={() => setModal("insert")} secondary>
                      + ADD GRUPO DE ALVOS
                    </Button>
                  </div>
                  <PressureTargets
                    setModal={setModal}
                    widgetId={widgetId}
                    setPressureTarget={setPressureTarget}
                  />
                </Label>
              </div>
            </>
          )}
        </ConnectedForm>
      </Card>
      <Popups
        pressureTarget={pressureTarget}
        modalType={modalType}
        setModal={setModal}
        widgetId={widgetId}
        setPressureTarget={setPressureTarget}
      />
    </>
  );
};

export default GroupTargetsForm;
