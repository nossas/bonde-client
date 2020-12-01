/* eslint-disable react/display-name */
import React, { ReactElement } from "react";

import UPDATE_INDIVIDUAL_MUTATION from "../UpdateIndividual";
import { UpdateStatus, CellName, CellDate } from "../../../components";
import { Columns, valueString, valueAndRow } from "../../../types";

const columns = (
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  },
  isVolunteerSelected?: boolean
): Array<Columns> => [
  {
    Header: "Dados Principais",
    columns: [
      {
        accessor: "id",
        Header: "Nome",
        Cell: ({ row: { original } }: valueAndRow): ReactElement =>
          CellName({ value: original }),
        bold: true,
        width: 250,
      },
      {
        accessor: "email",
        Header: "E-mail",
        Cell: ({ value }: { value: string }): ReactElement => (
          <span>{value || "-"}</span>
        ),
        width: 300,
      },
      {
        accessor: "address",
        Header: "Endereço",
        style: { padding: "10px 0 0 20px" },
        Cell: ({ value }: { value: string }): ReactElement => (
          <span>{value || "-"}</span>
        ),
        width: 300,
      },
      {
        accessor: "state",
        Header: "Estado",
        Cell: ({ value }: { value: string }): ReactElement => (
          <span>{value || "-"}</span>
        ),
      },
      {
        accessor: "userStatus",
        Header: "Status Inscrição",
        Cell: ({ value, row }: valueAndRow): ReactElement | null =>
          value && row ? (
            <UpdateStatus
              name="status"
              row={row}
              options={FilterOptions.userStatus}
              selected={value}
              type="individual"
              query={UPDATE_INDIVIDUAL_MUTATION}
            />
          ) : null,
        width: 200,
      },
      {
        accessor: "availability",
        Header: "Disponibilidade",
        Cell: ({ value, row }: valueAndRow): ReactElement | null =>
          value && row ? (
            <UpdateStatus
              name="availability"
              row={row}
              options={FilterOptions.availability}
              selected={value}
              type="individual"
              query={UPDATE_INDIVIDUAL_MUTATION}
            />
          ) : null,
        width: 200,
      },
      {
        accessor: "createdAt",
        Header: "Data Inscrição",
        className: isVolunteerSelected ? "hide" : "", // hide if is a volunteer
        Cell: ({ value }: valueString): string => CellDate({ value }),
      },
      {
        accessor: "whatsapp",
        Header: "Whatsapp",
        Cell: ({ value, row: { original } }: valueAndRow): ReactElement => (
          <span>{value || original.phone || "-"}</span>
        ),
      },
    ],
  },
];

export default columns;
