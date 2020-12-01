import React from "react";
import { valueString } from "../../types";

const CellStatus = ({ value }: valueString): React.ReactElement => (
  <span style={{ textTransform: "capitalize" }}>
    {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
  </span>
);

CellStatus.displayName = "CellStatus";

export default CellStatus;
