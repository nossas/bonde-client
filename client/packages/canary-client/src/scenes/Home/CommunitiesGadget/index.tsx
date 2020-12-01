import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "bonde-components";
import { useSession } from "bonde-core-tools";
import { useTranslation } from "react-i18next";

import SearchInput from "./SearchInput";
import CommunitiesScrollBox from "./CommunitiesScrollBox";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;

    ${Header.H5} {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const CommunitiesGadget = () => {
  const { t } = useTranslation("home");
  const { communities } = useSession();
  const [data, setData] = useState(communities);

  return (
    <Styles>
      <div className="header">
        {/** TODO: i18n */}
        <Header.H5>{t("gadgets.communities.title")}</Header.H5>
        <SearchInput
          placeholder={t("gadgets.communities.search")}
          field="name"
          data={communities}
          onChange={setData}
        />
      </div>
      <CommunitiesScrollBox communities={data} />
    </Styles>
  );
};

export default CommunitiesGadget;
