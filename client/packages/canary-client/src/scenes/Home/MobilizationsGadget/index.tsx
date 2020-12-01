import React from "react";
import styled from "styled-components";
import { useQuery, useSession } from "bonde-core-tools";
import { Header } from "bonde-components";
import { useTranslation } from "react-i18next";
import MobilizationCard, { Mobilization } from "./MobilizationCard";
import mobilizationsLastUpdated from "./query.graphql";
import LoadingCards from "./Loading";

const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 39px;
    margin-bottom: 15px;
  }

  ${Header.H5} {
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const GadgetWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 769px) {
    ${MobilizationCard}:nth-child(odd) {
      padding: 0 0.5rem 1rem 0;
    }
    ${MobilizationCard}:nth-child(even) {
      padding: 0 0 1rem 0.5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    ${MobilizationCard} {
      padding-bottom: 1rem;
    }
  }
`;

const MobilizationsGadget = () => {
  const { t } = useTranslation("home");
  const { user, storage, communities } = useSession();
  const { data, loading } = useQuery(mobilizationsLastUpdated, {
    variables: { userId: user.id },
  });

  if (loading) return <LoadingCards />;

  const parse = (m: any): Mobilization => ({
    id: m.id,
    name: m.name,
    goal: m.goal,
    facebookShareImage: m.facebook_share_image,
    customDomain: m.custom_domain,
    slug: m.slug,
    community: m.community,
  });

  const { mobilizations } = data;

  return (
    <Styles>
      <div className="header">
        <Header.H5>{t("gadgets.mobilizations.title")}</Header.H5>
      </div>
      <GadgetWrap>
        {mobilizations.map(parse).map((mobilization: Mobilization) => (
          <MobilizationCard
            key={mobilization.id}
            mobilization={mobilization}
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                const community = communities.filter(
                  (c) => c.id === mobilization.community.id
                )[0];
                storage.setAsyncItem("community", community).then(() => {
                  window.location.href = new URL(
                    `/mobilizations/${mobilization.id}/edit`,
                    process.env.REACT_APP_DOMAIN_ADMIN
                  ).href;
                });
              }
            }}
          />
        ))}
      </GadgetWrap>
    </Styles>
  );
};

export default MobilizationsGadget;
