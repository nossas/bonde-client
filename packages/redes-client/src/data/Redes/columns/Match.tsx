/* eslint-disable react/display-name */
import React from "react";
import { Button } from "bonde-components";
import { Columns, valueString, Individual } from "../../../types";

const columns = (
  setIndividual: (individual: any) => void,
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
      }): JSX.Element | string => {
        return original.firstName ? (
          <span>{`${original.firstName} ${original.lastName}`}</span>
        ) : (
          "-"
        );
      },
      bold: true,
    },
    {
      accessor: "email",
      Header: "E-mail",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "distance",
      Header: "Distância",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "address",
      Header: "Endereço",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span>{value || "-"}</span>
      ),
    },
    {
      accessor: "userStatus",
      className: isVolunteerSelected === false ? "hide" : "", // hide if is a recipient
      Header: "Status Inscrição",
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span style={{ textTransform: "capitalize" }}>
          {value ? value.replace(/__/g, ": ").replace(/_/g, " ") : "-"}
        </span>
      ),
    },
    {
      accessor: "availability",
      Header: "Disponibilidade",
      className: isVolunteerSelected === false ? "hide" : "", // hide if is a recipient
      Cell: ({ value }: { value: string }): JSX.Element | string => (
        <span style={{ textTransform: "capitalize" }}>
          {value ? value : "-"}
        </span>
      ),
    },
    {
      accessor: "createdAt",
      Header: "Data Inscrição",
      className: isVolunteerSelected === true ? "hide" : "", // hide if is a volunteer
      Cell: ({ value }: valueString): string => {
        if (!value) {
          return "-";
        }
        const data = new Date(value);
        return data.toLocaleDateString("pt-BR");
      },
    },
    {
      accessor: "phone",
      Header: "Ação",
      className: "sticky",
      Cell: ({
        row: { original },
      }: {
        row: { original: Individual };
      }): JSX.Element | null => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                setIndividual((prevState: any) => ({
                  ...prevState,
                  [isVolunteerSelected ? "volunteer" : "recipient"]: original,
                }));
                return setModal(true);
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
