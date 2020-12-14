import React from "react";
import FetchPressureTargets, {
  PressureTarget as PressureTargetsType,
} from "./FetchPressureTargets";
import { Text, Icon, CleanButton } from "bonde-components";
import { css } from "styled-components/macro";

type Props = {
  widgetId: number;
  setModal: (arg?: "insert" | "delete" | "update") => void;
  setPressureTarget: (arg: PressureTargetsType) => void;
};

const PressureTargets = ({
  widgetId,
  setModal,
  setPressureTarget,
}: Props): React.ReactElement => {
  return (
    <div
      css={css`
        display: grid;
        grid-row-gap: 15px;
      `}
    >
      <FetchPressureTargets widgetId={widgetId}>
        {({ pressure_targets }: { pressure_targets: PressureTargetsType[] }) =>
          pressure_targets.map((target) => (
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                padding: 20px;
                border: 1px solid #eee;
              `}
              key={target.id}
            >
              <Text>{target.label}</Text>
              <div>
                <CleanButton
                  onClick={() => {
                    setPressureTarget(target);
                    return setModal("update");
                  }}
                >
                  <Icon name="Pencil" />
                </CleanButton>
                <CleanButton
                  onClick={() => {
                    setPressureTarget(target);
                    return setModal("delete");
                  }}
                >
                  <Icon name="Trash" />
                </CleanButton>
              </div>
            </div>
          ))
        }
      </FetchPressureTargets>
    </div>
  );
};

export default PressureTargets;
