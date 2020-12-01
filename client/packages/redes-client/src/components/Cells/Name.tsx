import React from "react";
import { valueFirstName } from "../../types";

const CellName = ({ value }: valueFirstName): React.ReactElement => (
  <span>{value ? `${value.firstName} ${value.lastName || ""}` : "-"}</span>
);

CellName.displayName = "CellName";

export default CellName;
