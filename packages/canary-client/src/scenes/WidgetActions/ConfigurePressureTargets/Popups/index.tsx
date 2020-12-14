import React from "react";
import { Modal } from "bonde-components";
import InsertTarget from "./InsertOrUpdateTarget";
import DeleteTarget from "./DeleteTarget";
import { PressureTarget } from "../FetchPressureTargets";

type Props = {
  modalType?: "insert" | "delete" | "update";
  setModal: (arg?: "insert" | "delete" | "update") => void;
  widgetId: number;
  pressureTarget?: PressureTarget;
  setPressureTarget: (arg?: PressureTarget) => void;
};

const Popups = ({
  modalType,
  setModal,
  widgetId,
  pressureTarget,
  setPressureTarget,
}: Props): React.ReactElement => {
  return (
    <Modal
      width="375px"
      isOpen={!!modalType}
      onClose={() => setModal(undefined)}
    >
      {modalType === "insert" ||
        (modalType === "update" && (
          <InsertTarget
            setModal={setModal}
            widgetId={widgetId}
            pressureTarget={pressureTarget}
          />
        ))}
      {modalType === "delete" && pressureTarget && (
        <DeleteTarget
          setPressureTarget={setPressureTarget}
          setModal={setModal}
          pressureTargetId={pressureTarget.id}
        />
      )}
    </Modal>
  );
};

export default Popups;
