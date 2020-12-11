import React from "react";
import { css } from "styled-components/macro";
import {
  Card,
  Header,
  ConnectedForm,
  InputField,
  TextareaField,
  Button,
  Label
} from "bonde-components";
import { useMutation } from "bonde-core-tools";
import UPDATE_WIDGET_SETTINGS from "../UpdateWidgetSettings";

type Form = {
  subject: string;
  body: string;
};

type Props = {
  widgetId: number;
};

const GroupTargetsForm = ({ widgetId }: Props): React.ReactElement => {
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
                  bottom: 680px;
                  left: 1090px;
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
                <Label>ADICIONAR GRUPO DE ALVOS</Label>
                <div
                  css={css`
                    border: 1px solid #eee;
                  `}
                >
                  <Button secondary> + ADD GRUPO DE ALVOS</Button>
                </div>
                <InputField
                  name="subject"
                  placeholder="Escreva um assunto"
                  label="ASSUNTO DO EMAIL PARA OS ALVOS"
                />
                <TextareaField
                  name="body"
                  placeholder="Escreva aqui o email..."
                  label="CORPO DO EMAIL PARA OS ALVOS"
                />
              </div>
            </>
          )}
        </ConnectedForm>
      </Card>
    </>
  );
};

export default GroupTargetsForm;
