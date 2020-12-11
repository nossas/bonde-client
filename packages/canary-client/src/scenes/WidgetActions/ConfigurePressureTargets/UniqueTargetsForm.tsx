import React from "react";
import { css } from "styled-components/macro";
import {
  Card,
  Header,
  Text,
  ConnectedForm,
  InputField,
  TextareaField,
  Button,
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

const UniqueTargetsForm = ({ widgetId }: Props): React.ReactElement => {
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
                  bottom: 480px;
                  left: 1090px;
                  width: 150px;
                `}
              >
                <Button type="submit" disabled={submitting}>
                  Salvar
                </Button>
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
            </>
          )}
        </ConnectedForm>
      </Card>
      <Card padding={{ x: 50, y: 40 }}>
        <Header.H4 style={{ marginBottom: "10px" }}>
          Como adicionar alvos
        </Header.H4>
        <Text>
          {`Escreva um alvo em cada linha seguindo o formato abaixo, pressionando cmd+enter para ir pra linha seguinte.`}
          <br />
          <br />
          {`Formato do alvo: Nome <email@provedor.com> (obrigatório usar os caractéres < e > para agrupar os alvos).`}
          <br />
          <br />
          {`Quando acabar, salve as alterações clicando no botão no canto superior direito da tela.`}
          <br />
          <br />
          {`Os alvos serão exibidos em ordem aleatória na widget de pressão. Ou seja, cada vez que a mobilização for acessada, a ordem de exibição será diferente.`}
        </Text>
      </Card>
    </>
  );
};

export default UniqueTargetsForm;
