import { Individual } from "../Individuals";

export interface Columns {
  accessor?: string;
  Header: any;
  Cell?: (arg0: any) => string | React.ReactElement | null;
  className?: string;
  bold?: boolean;
  show?: boolean;
  Column?: any;
  columns?: Array<any>;
  minWidth?: number;
  width?: number;
  collapse?: boolean;
}

export type valueString = {
  value: string;
  row?: any;
};

export type valueFirstName = {
  value: {
    firstName: string;
    lastName?: string;
    id?: number;
  };
};

export type valueAndRow = {
  value: string;
  row: {
    original: Individual;
  };
};
