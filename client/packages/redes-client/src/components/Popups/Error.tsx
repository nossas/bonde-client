import React from "react";
import { Header, Text, Button } from "bonde-components";
import { Individual } from "../../types";

export default function Error({
  match,
  onSubmit,
  errorMsg,
}: {
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
  onSubmit: () => void;
  errorMsg: string;
}): React.ReactElement {
  return (
    <div>
      <Header.H2 style={{ margin: 0 }}>Ops!</Header.H2>
      <Text style={{ margin: '15px 0 25px 0' }}>
        Encontramos um erro e {match.recipient.firstName} não pôde ser
        encaminhada para {match.volunteer.firstName}
      </Text>
      <div
        style={{
          backgroundColor: "#EEEEEE",
          padding: "15px 20px",
        }}
      >
        <Text>{errorMsg}</Text>
      </div>
      <Text style={{ margin: '25px 0' }}>
        Clique abaixo para tentar outra vez. Se o erro persistir, comunique a
        equipe de tecnologia.
      </Text>
      <Button onClick={onSubmit}>tentar novamente</Button>
    </div>
  );
}
