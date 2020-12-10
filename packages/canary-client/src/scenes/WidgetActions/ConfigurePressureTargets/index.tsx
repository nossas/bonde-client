import React, { useState } from "react";
import { Header } from "bonde-components";
import { css } from "styled-components/macro";

import SimpleTargetsForm from "./SimpleTargetsForm";
import MultipleTargetsForm from "./MultipleTargetsForm";

// const RadioInput = styled.span`
//   display: inline-block;
//   position: relative;
//   padding: 0 6px;
//   margin: 10px 0 0;

//   & > input[type="radio"] {
//     display: none;
//   }

//   & > label {
//     color: #666;
//     font-weight: normal;
//   }

//   & > label:before {
//     content: " ";
//     display: inline-block;
//     position: relative;
//     top: 5px;
//     margin: 0 5px 0 0;
//     width: 20px;
//     height: 20px;
//     border-radius: 11px;
//     border: 2px solid #ee0099;
//     background-color: transparent;
//   }

//   & > input[type="radio"]:checked + label:after {
//     border-radius: 11px;
//     width: 12px;
//     height: 12px;
//     position: absolute;
//     top: 9px;
//     left: 10px;
//     content: " ";
//     display: block;
//     background: #ee0099;
//   }
// `;

type Props = {
  widgetId: number;
};

const ConfigurePressureTargets = ({ widgetId }: Props): React.ReactElement => {
  const [pressureType, setPressureType] = useState("groups");
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
        {/* <RadioInput> */}
          <input
            type="radio"
            name="pressureType"
            value="group"
            checked={pressureType === "group"}
            onChange={(e) => setPressureType(e.target.value)}
          />
          <label>Um grupo de alvos</label>
        {/* </RadioInput> */}
        {/* <RadioInput> */}
          <input
            type="radio"
            name="pressureType"
            value="groups"
            checked={pressureType === "groups"}
            onChange={(e) => setPressureType(e.target.value)}
          />
          <label>Mais de um grupo de alvos (Ex: Por estado)</label>
        {/* </RadioInput> */}
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 55% 45%;
          grid-column-gap: 20px;
          height: 100%;
        `}
      >
        {pressureType === "group" && <SimpleTargetsForm widgetId={widgetId} />}
        {pressureType === "groups" && (
          <MultipleTargetsForm widgetId={widgetId} />
        )}
      </div>
    </>
  );
};

export default ConfigurePressureTargets;
