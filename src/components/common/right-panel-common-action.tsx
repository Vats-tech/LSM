import { useState } from "react";
import { ICONS_DETAILS } from "../../util/constants";
import Icons from "./icons";
import LsmButton from "./lsm-button";
import useToast from "./toast/use-toast";
import ConfirmationModal from "./confirmation-modal";

interface LsmHeaderTypes {
  addLabel: string;
  trashLabel: string;
  onClickAddNew: () => void;
  onClickDeleteAll: () => void;
}

const LsmHeader = ({
  addLabel,
  trashLabel,
  onClickAddNew,
  onClickDeleteAll,
}: LsmHeaderTypes) => {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  /**
   * Toast action to display desired toast.
   */
  const { addToasts } = useToast();

  /**
   * Enable delete and display desired tost
   */

  const onDelete = () => {
    setShowConfirmationModal(true);
  };

  // TODO - On delete all cookies items, delete all pinnedItems in local storage also.

  const onDeleteConfirm = () => {
    onClickDeleteAll();
    setShowConfirmationModal(false);
    addToasts("All cookie has been deleted");
  };

  const onCancel = () => {
    setShowConfirmationModal(false);
  };
  return (
    <div className="flex gap-4 mt-4">
      <div className="flex justify-end parse-cookie">
        <LsmButton
          dataTestId="add-new-cookie-button"
          classes="flex items-center gap-3 bg-blue-600"
          action={onClickAddNew}
          label={addLabel}
        >
          <Icons
            iconSize="medium"
            id={ICONS_DETAILS.ADD.ID}
            classes={`${ICONS_DETAILS.ADD.CLASSES} fill-white-600`}
          />
        </LsmButton>
      </div>

      <div className="flex justify-end parse-cookie">
        <LsmButton
          dataTestId="delete-all-cookie-button"
          classes="flex items-center gap-3 bg-red-600"
          action={onDelete}
          label={trashLabel}
        >
          <Icons
            iconSize="medium"
            id={ICONS_DETAILS.TRASH.ID}
            classes={`${ICONS_DETAILS.TRASH.CLASSES} fill-white-600`}
          />
        </LsmButton>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          label="cookie"
          onConfirm={onDeleteConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default LsmHeader;
