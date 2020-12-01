import React from "react";
import styled from "styled-components";
import { useQuery } from "bonde-core-tools";
import { Loading } from "bonde-components";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

type FetchDataFromGraphqlProps = {
  children: any;
  variables?: Record<string, unknown>;
  query: any;
};

export default function FetchDataFromGraphql({
  children,
  variables,
  query,
}: FetchDataFromGraphqlProps): any {
  const { loading, error, data } = useQuery(query, {
    variables,
  });

  if (loading)
    return (
      <WrapLoading>
        <Loading />
      </WrapLoading>
    );
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children(data);
}
