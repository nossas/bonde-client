import React from "react";

import { Icon, Theme as theme } from "bonde-components";
import { whatsappLink } from "../../../services/utils";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Individual } from "../../../types";

const Grid = styled.div`
  width: 100%;
  display: grid;
  justify-content: space-around;
  padding: 10px;
  grid-row-gap: 5px;
`;

const MarginSVG = styled.div`
  & > svg {
    margin-right: 5px;
  }
`;

const BtnWhatsapp = ({
  original,
}: {
  original: { volunteer: Individual; recipient: Individual };
}): React.ReactElement => {
  const matchGroups = [original.volunteer.group, original.recipient.group]
  return (
    <Grid>
      {matchGroups.map((group, i) => {
        const individual = group?.isVolunteer ? "volunteer" : "recipient";
        return (
          <MarginSVG key={`match-groups-${i}`}>
            <Icon name="Whatsapp" size="small" color={theme.brand.main} />
            <a
              href={whatsappLink(
                original[individual]?.whatsapp ||
                  original[individual]?.phone ||
                  "",
                ""
              )}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              key={`whatsapp-link-${i}`}
              css={css`
                color: ${theme.brand.main};
              `}
            >
              {group?.name}
            </a>
          </MarginSVG>
        );
      })}
    </Grid>
  )
}

export default BtnWhatsapp;
