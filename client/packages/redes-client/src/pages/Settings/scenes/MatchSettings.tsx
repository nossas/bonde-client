import React from "react";
import styled, { css } from "styled-components/macro";
import { useMutation } from "bonde-core-tools";
import { Success, toast } from "bonde-components";
import {
  Button,
  ConnectedForm,
  Header,
  Text,
  TextareaField,
  Validators,
  Card,
  Hint,
} from "bonde-components";

import UPDATE_GROUPS from "../../../graphql/UpdateGroups";
import { Tip, WhatsappCards } from ".";
import { Groups } from "../../../types";

const WrapButton = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  z-index: 1;
  & > button {
    width: 220px;
  }
`;

const MatchSettings = ({
  groups,
}: {
  groups: Groups;
}): React.ReactElement => {
  const { required } = Validators;
  const [saveSettings, { error }] = useMutation(UPDATE_GROUPS);
  const initialValues = {
    input: {
      whatsapp: groups.reduce(
        (o, group) => ({
          ...o,
          [group.name.toLowerCase().split(" ").join("_")]:
            group.settings?.communication?.whatsapp || "",
        }),
        {}
      ),
    },
  };

  // const [saveGroup] = useMutation(UPDATE_GROUPS, {
  //   variables:
  // });

  const onSubmit = async (values: {
    input: { whatsapp: Record<string, string> };
  }) => {
    const {
      input: { whatsapp },
    } = values;
    try {
      const newMsgs = Object.keys(whatsapp).map((i) => {
        const group = groups.find(
          (g) => g.name.toLowerCase().split(" ").join("_") === i
        );
        return {
          redeGroupId: { _eq: group?.id },
          updatedSettings: {
            communication: {
              whatsapp: `${whatsapp[i]}`,
            },
          },
        };
      });
      await Promise.all(
        newMsgs.map(async (i) => await saveSettings({ variables: i }))
      );
      if (!error) {
        toast(<Success message='Configuração salva com sucesso!' />, { type: toast.TYPE.SUCCESS });
      }
    } catch (e) {
      toast('Houve um problema ao tentar salvar as configurações', { type: toast.TYPE.ERROR });
      console.log("err", e);
    }
  };

  return (
    <ConnectedForm initialValues={initialValues} onSubmit={onSubmit}>
      {({ submitting }) => (
        <>
          <WrapButton>
            <Button type="submit" disabled={submitting}>
              Salvar alterações
            </Button>
          </WrapButton>
          <div style={{ position: "relative", bottom: "40px" }}>
            <Header.H3 style={{ margin: 0 }}>Comunicação</Header.H3>
            <Text>
              Abaixo você define a mensagem que será enviada à pessoa quando um
              match for realizado.
            </Text>
            <WhatsappCards>
              <div>
                {groups.map((group, i) => {
                  return (
                    <Card
                      rounded={"5px"}
                      padding={{ x: 30, y: 30 }}
                      margin={{ bottom: 30 }}
                      key={`whatsapp-card-${i}`}
                    >
                      <Header.H4 style={{ margin: 0, marginBottom: '15px' }}> 
                        {group.name}
                      </Header.H4>
                      {error && <Hint color="error">{error.message}</Hint>}
                      <div
                        css={css`
                          & textarea {
                            height: 100px;
                            margin-bottom: 30px;
                          }
                        `}
                      >
                        <TextareaField
                          name={`input.whatsapp.${group.name
                            .toLowerCase()
                            .split(" ")
                            .join("_")}`}
                          label="Mensagem de whatsapp"
                          validate={required("Valor não pode ser vazio")}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Tip groups={groups} />
            </WhatsappCards>
          </div>
        </>
      )}
    </ConnectedForm>
  );
};

export default MatchSettings;
