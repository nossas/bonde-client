import React from "react";
import { Label } from "bonde-components";
import styled from "styled-components";

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

const Radio = styled(
  ({
    children,
    className,
    name,
    value,
    checked,
    onChange,
  }): React.ReactElement => {
    return (
      <Label className={className}>
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          value={value}
        />
        {children}
      </Label>
    );
  }
)`
  margin: 15px 15px 0 0;
`;

export default Radio;
