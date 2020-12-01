import { valueString } from "../../types";

const CellDate = ({ value }: valueString): string => {
  if (!value) {
    return "-";
  }
  const data = new Date(value);
  return data.toLocaleDateString("pt-BR");
};

CellDate.displayName = "CellDate";

export default CellDate;
