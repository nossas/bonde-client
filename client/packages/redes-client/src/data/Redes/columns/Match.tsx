/* eslint-disable react/display-name */
import React, { ReactElement } from "react";
import { Button } from "bonde-components";

import { CellDate, CellName, CellStatus } from "../../../components";
import { Columns, valueString, Individual } from "../../../types";

const columns = (
  dispatch: (value: {
    type: string;
    value: { [x: string]: Individual };
  }) => void,
  setModal: (value: boolean) => void,
  isVolunteerSelected?: boolean
): Array<Columns> => {
  return [
    {
      accessor: "id",
      Header: "Nome",
      Cell: ({
        row: { original },
      }: {
        row: { original: Individual };
      }): ReactElement => CellName({ value: original }),
      bold: true,
    },
    {
      accessor: "email",
      Header: "E-mail",
      Cell: ({ value }: { value: string }): ReactElement => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "distance",
      Header: "Distância",
      Cell: ({ value }: { value: string }): ReactElement => (
        <span>{Number(value).toFixed(2) || "-"}</span>
      ),
      width: 50,
    },
    {
      accessor: "address",
      Header: "Endereço",
      Cell: ({ value }: { value: string }): ReactElement => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "userStatus",
      className: isVolunteerSelected === false ? "hide" : "", // hide if is a recipient
      Header: "Status Inscrição",
      Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
      width: 100,
    },
    {
      accessor: "availability",
      Header: "Disponibilidade",
      className: isVolunteerSelected === false ? "hide" : "", // hide if is a recipient
      Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
      width: 100,
    },
    {
      accessor: "createdAt",
      Header: "Data Inscrição",
      className: isVolunteerSelected ? "hide" : "", // hide if is a volunteer
      Cell: ({ value }: valueString): string => CellDate({ value }),
    },
    {
      accessor: "phone",
      Header: "Ação",
      className: "sticky",
      Cell: ({
        row: { original },
      }: {
        row: { original: Individual };
      }): ReactElement | null => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                setModal(true);
                dispatch({
                  type: "match",
                  value: {
                    [isVolunteerSelected ? "volunteer" : "recipient"]: original,
                  },
                });
              }}
              main="#ee0099"
              hover="#e2058a"
              focus="#b06c"
              secondary
            >
              Selecionar
            </Button>
          </div>
        );
      },
    },
  ];
};

export default columns;
