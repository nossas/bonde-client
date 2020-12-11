import React, { useState } from "react";
import { Header } from "bonde-components";
import { css } from "styled-components/macro";

import UniqueTargetsForm from "./UniqueTargetsForm";
import GroupTargetsForm from "./GroupTargetsForm";
import Radio from "../../../components/Radio";

type Props = {
  widgetId: number;
};

const ConfigurePressureTargets = ({ widgetId }: Props): React.ReactElement => {
  const [pressureType, setPressureType] = useState("unique");
  return (
    <>
      <Header.H5 style={{ fontWeight: 600, marginTop: "15px" }}>
        TIPO DE PRESSÃO
      </Header.H5>
      <div
        css={css`
          display: flex;
          margin-bottom: 30px;
        `}
      >
        <Radio
          type="radio"
          name="pressureType"
          value="unique"
          checked={pressureType === "unique"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPressureType(e.target.value)
          }
        >
          Um grupo de alvos
        </Radio>
        <Radio
          type="radio"
          name="pressureType"
          value="group"
          checked={pressureType === "group"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPressureType(e.target.value)
          }
        >
          Mais de um grupo de alvos (Ex: Por estado)
        </Radio>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 55% 45%;
          grid-column-gap: 20px;
          height: 100%;
        `}
      >
        {pressureType === "unique" && <UniqueTargetsForm widgetId={widgetId} />}
        {pressureType === "group" && <GroupTargetsForm widgetId={widgetId} />}
      </div>
    </>
  );
};

export default ConfigurePressureTargets;
