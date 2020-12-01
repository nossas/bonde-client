import React from "react";
import { Text, Header, Card } from "bonde-components";
import { Groups } from "../../../types";

const Tip = ({ groups }: { groups: Groups }): React.ReactElement => {
  return (
    <Card rounded={"5px"} padding={{ x: 20, y: 30 }}>
      <Header.H3 style={{ marginTop: 0 }}>Dica</Header.H3>
      <div style={{ marginTop: 15, marginBottom: 10 }}>
        <Text>
          Pra usar dados das pessoas diretamente na mensagem, use as variáveis
          abaixo:
        </Text>
      </div>
      {groups.map((group, i) => {
        return group.isVolunteer ? (
          <React.Fragment key={`tip-volunteer-${i}`}>
            <Text>
              <span style={{ fontWeight: 800 }}>VFIRSTNAME</span>: Primeiro nome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>VLASTNAME</span>: Sobrenome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>VEMAIL</span>: Email (
              {group.name})
              <Text>
                <span style={{ fontWeight: 800 }}>VWHATSAPP</span>: Whatsapp (
                {group.name})
              </Text>
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>VREGISTEROCCUPATION</span>: Nº
              de registro ({group.name})
            </Text>
          </React.Fragment>
        ) : (
          <React.Fragment key={`tip-recipient-${i}`}>
            <Text>
              <span style={{ fontWeight: 800 }}>IFIRSTNAME</span>: Primeiro nome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>ILASTNAME</span>: Sobrenome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>IEMAIL</span>: Email (
              {group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>IWHATSAPP</span>: Whatsapp (
              {group.name})
            </Text>
          </React.Fragment>
        );
      })}
      <Text>
        <span style={{ fontWeight: 800 }}>AGENT</span>: Pessoa que faz o match
      </Text>
    </Card>
  );
};

export default Tip;
