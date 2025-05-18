import { ICONS_DETAILS } from "../../util/constants";
import LsmButton from "./lsm-button";
import LsmInputBox from "./lsm-input-box";

interface AddNewModuleTypes {
  title: string;
  subtitle?: string;
  classes?: string;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  newItemKey: string;
  newItemValue: string;
  onInputNewKey: (args0: any) => void;
  onInputNewValue: (args0: any) => void;
}

const AddNewModule = ({
  title,
  subtitle,
  classes,
  onClose,
  onCancel,
  onSave,
  newItemKey,
  newItemValue,
  onInputNewKey,
  onInputNewValue,
}: AddNewModuleTypes) => {
  const renderInputBox = (
    items: Array<{
      label: string;
      key: string;
      value: string;
      placeholder: string;
      action: (args0: any) => void;
    }>
  ) =>
    items.map((item, index: number) => (
      <LsmInputBox
        key={index}
        name={item.key}
        label={item.label}
        value={item.value}
        onChange={item.action}
        placeholderLabel={item.placeholder}
      />
    ));
  return (
    <div
      data-testid="add-new-module-container"
      className={`w-full gap-5 flex flex-col gap-2 parsed-key-value add-new-value relative ${classes}`}
    >
      <LsmButton
        dataTestId="close-add-new-module"
        classes="absolute top-1 right-1"
        action={onClose}
        icon={ICONS_DETAILS.CLEAR.ID}
        iconSize="medium"
        iconClasses={`${ICONS_DETAILS.CLEAR.CLASSES} fill-blue-600`}
      />

      <div className="pl-1">
        <h3
          data-testid="add-new-module-title"
          className="text-base font-semibold"
        >
          {title}
        </h3>

        {subtitle && (
          <p data-testid="add-new-module-subtitle" className="mt-1 text-xs">
            {subtitle}
          </p>
        )}
      </div>

      {renderInputBox([
        {
          label: "New key",
          key: "new-key",
          value: newItemKey,
          placeholder: "Please enter key",
          action: onInputNewKey,
        },
        {
          label: "New value",
          key: "new-value",
          value: newItemValue,
          placeholder: "Please enter value",
          action: onInputNewValue,
        },
      ])}

      <div className="text-end">
        <LsmButton
          id="cancel-cookie"
          classes="border border-solid border-slate-600 text-gray-800 mr-4"
          action={onCancel}
          label="cancel"
        />
        <LsmButton
          id="save-cookie"
          classes="bg-blue-600 text-white"
          action={onSave}
          label="save"
        />
      </div>
    </div>
  );
};

export default AddNewModule;
