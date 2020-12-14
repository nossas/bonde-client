import React from "react";
import {
  ConnectedForm,
  Header,
  InputField,
  TextareaField,
  Button,
} from "bonde-components";
import { PressureTarget } from "../FetchPressureTargets";
import { useMutation, gql } from "bonde-core-tools";

type Props = {
  widgetId?: number;
  setModal: (arg?: "insert" | "delete" | "update") => void;
  pressureTarget?: PressureTarget;
};

type FormProps = {
  name: string;
  subject: string;
  body: string;
};

const INSERT_OR_UPDATE_PRESSURE_TARGETS = gql`
  mutation InsertOrUpdatePressureTarget(
    $target: [pressure_targets_insert_input!]!
    $targetId: Int_comparison_exp
  ) {
    insert_pressure_targets(
      objects: $target
      on_conflict: {
        constraint: pressure_targets_pkey
        where: { id: $targetId }
        update_columns: [email_body, email_subject, identify, label, targets]
      }
    ) {
      affected_rows
    }
  }
`;

const InsertOrUpdateTarget = ({
  widgetId: _,
  setModal,
  pressureTarget,
}: Props): React.ReactElement => {
  const [_saveTarget] = useMutation(INSERT_OR_UPDATE_PRESSURE_TARGETS);
  const onSubmit = ({ name, subject, body }: FormProps) => {
    // const newTarget = {
    //   label: name,
    //   email_subject: subject,
    //   email_body: body,
    //   identify: name.toLowerCase().split(' ').join('_')
    // }
    console.log({ name, subject, body })
  };
  return (
    <>
      <Header.H2>
        {!!pressureTarget ? "Atualizar" : "Adicionar"} alvos
      </Header.H2>
      <ConnectedForm onSubmit={onSubmit} initialValues={pressureTarget || {}}>
        {({ submitting }: any) => (
          <>
            <InputField
              name="name"
              placeholder="Nome do grupo de alvos"
              label="Ex: Rio de Janeiro"
            />
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
            <Button secondary onClick={() => setModal(undefined)}>
              Cancelar
            </Button>
            <Button disabled={submitting} type="submit">
              Salvar
            </Button>
          </>
        )}
      </ConnectedForm>
    </>
  );
};

export default InsertOrUpdateTarget;
