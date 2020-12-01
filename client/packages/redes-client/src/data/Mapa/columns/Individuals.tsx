/* eslint-disable react/display-name */
import React, { ReactElement } from "react";
import { CellStatus, CellDate } from "../../../components";
import { Columns, valueString, valueAndRow } from "../../../types";

const columns = (
  _FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  },
  isVolunteerSelected?: boolean
): Array<Columns> => [
  {
    accessor: "id",
    Header: "Nome",
    Cell: ({
      row: { original },
      value,
    }: valueAndRow): ReactElement | string => {
      return original.firstName ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
          href={`https://mapadoacolhimento.zendesk.com/agent/users/${value}/requested_tickets`}
        >
          <span>{original.firstName}</span>
        </a>
      ) : (
        "-"
      );
    },
    bold: true,
    width: 250,
  },
  {
    accessor: "email",
    Header: "E-mail",
    Cell: ({ value }: valueString): ReactElement => <span>{value || "-"}</span>,
    width: 200,
  },
  {
    accessor: "tipoDeAcolhimento",
    Header: "Tipo",
    className: isVolunteerSelected ? "hide" : "",
    Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
  },
  {
    accessor: "address",
    Header: "Endereço",
    Cell: ({ value }: valueString): ReactElement => <span>{value || "-"}</span>,
    width: 300,
  },
  {
    accessor: "state",
    Header: "Estado",
    Cell: ({ value }: valueString): ReactElement => (
      <span style={{ textTransform: "uppercase" }}>{value || "-"}</span>
    ),
  },
  {
    accessor: "userStatus",
    className: isVolunteerSelected === false ? "hide" : "",
    Header: "Status Inscrição",
    Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
    width: 200,
  },
  {
    accessor: "relationshipStatus",
    className: isVolunteerSelected ? "hide" : "",
    Header: "Status Relação",
    Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
  },
  {
    accessor: "availability",
    Header: "Disponibilidade",
    className: isVolunteerSelected === false ? "hide" : "",
    Cell: ({ value }: valueString): ReactElement => CellStatus({ value }),
    width: 200,
  },
  {
    accessor: "createdAt",
    Header: "Data Inscrição",
    className: isVolunteerSelected ? "hide" : "", // hide if is a volunteer
    Cell: ({ value }: valueString): string => CellDate({ value }),
  },
  {
    accessor: "encaminhamentosRealizados",
    Header: "ER",
    className: isVolunteerSelected === false ? "hide" : "",
    Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
    width: 50,
  },
  {
    accessor: "atendimentosEmAndamento",
    Header: "AT INI",
    className: isVolunteerSelected === false ? "hide" : "",
    Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
    width: 50,
  },
  {
    accessor: "atendimentosConcluidos",
    Header: "AT CON",
    className: isVolunteerSelected === false ? "hide" : "",
    Cell: ({ value }: valueString): ReactElement => <span>{value || 0}</span>,
    width: 80,
  },
  {
    accessor: "whatsapp",
    Header: "Whatsapp",
    Cell: ({
      value,
      row: { original },
    }: valueAndRow): ReactElement | string => (
      <span>{value || original.phone || "-"}</span>
    ),
  },
];

export default columns;
