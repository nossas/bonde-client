import React from "react";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import {
  RoundSelectField,
  RoundInputField,
  CleanButton,
  Icon,
  ConnectedForm,
  Form,
} from "bonde-components";
import styled from "styled-components";
import { AutoSaveFilters } from "./";

const WrapForm = styled.div`
  & > ${Form} {
    display: grid;
    width: 100%;
    grid-gap: 15px;
    @media (min-width: 992px) {
      grid-template-columns: 300px repeat(auto-fill, minmax(165px, 1fr));
      justify-content: start;
      align-items: center;
    }
    & > div {
      padding: 0;
    }
  }
`;

const WrapInput = styled.div`
  position: relative;
  & > div {
    padding: 0;
  }

  & .icons {
    position: absolute;
    right: 12px;
    top: 12px;
    display: flex;
    & button {
      border: none;
      padding: 0;
    }
  }
`;

type Options = {
  [x: string]: { label: string; value: string | number }[];
};

type FilterProps = {
  initialValues?: any;
  save: (e: any) => Promise<any>;
  onGroupChange: (e: any) => void;
  options: Options;
  search?: boolean;
  groups?: boolean;
  userStatus?: boolean;
  relationshipStatus?: boolean;
  state?: boolean;
  agent?: boolean;
  availability?: boolean;
  searchPlaceholder?: string;
};

const Filters = ({
  save,
  initialValues,
  options,
  searchPlaceholder,
  onGroupChange,
  ...props
}: FilterProps): React.ReactElement => {
  const { users } = useCommunityExtra();

  const agentOptions = users?.map(({ user }) => ({
    label: `${user.firstName} ${user.lastName || ""}`,
    value: user.id,
  }));

  return (
    <WrapForm>
      <ConnectedForm onSubmit={save} initialValues={initialValues}>
        {({ form }) => {
          return (
            <>
              <AutoSaveFilters save={save} />
              {props.search && (
                <WrapInput>
                  <RoundInputField
                    placeholder={
                      searchPlaceholder || "Buscar nome, email, especialidade"
                    }
                    name="query"
                  />
                  <div className="icons">
                    {initialValues.query && (
                      <CleanButton
                        onClick={() => form.change("query", undefined)}
                        style={{ paddingRight: "5px" }}
                      >
                        <Icon name="Close" size="xs" color="#ee0099" />
                      </CleanButton>
                    )}
                    <CleanButton>
                      <Icon
                        name="Search"
                        size="small"
                        color={initialValues.query ? "#ee0099" : "#aaa"}
                      />
                    </CleanButton>
                  </div>
                </WrapInput>
              )}
              {props.groups && (
                <RoundSelectField
                  name="groups"
                  placeholder="Grupo"
                  options={options.groups}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                  onChange={onGroupChange}
                />
              )}
              {props.userStatus && (
                <RoundSelectField
                  name="userStatus"
                  placeholder="Status Inscrição"
                  options={options.userStatus}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.relationshipStatus && (
                <RoundSelectField
                  name="relationshipStatus"
                  placeholder="Status Relação"
                  options={options.relationshipStatus}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.availability && (
                <RoundSelectField
                  name="availability"
                  placeholder="Disponibilidade"
                  options={options.availability}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.state && (
                <RoundSelectField
                  name="state"
                  placeholder="Estado"
                  options={options.state}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.agent && (
                <RoundSelectField
                  name="agent"
                  placeholder="Feito por"
                  options={agentOptions as any}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
            </>
          );
        }}
      </ConnectedForm>
    </WrapForm>
  );
};

Filters.defaultProps = {
  onGroupChange: (e: any) => e,
};

export default Filters;
