import { ICONS_DETAILS } from "../../util/constants";
import LsmButton from "./lsm-button";

interface InputBoxProps {
  label: string;
  value?: string;
  name?: string;
  classes?: string;
  onCopy?: () => void;
  placeholderLabel?: string;
  isCloseButtonNeeded?: boolean;
  onClear?: (args0?: any) => void;
  onChange: (args0?: any) => void;
}
const options = ["Control", "Enabled"];

const LsmInputBox = ({
  label,
  name,
  value,
  classes,
  onClear,
  onChange,
  placeholderLabel,
  isCloseButtonNeeded = true,
}: InputBoxProps) => {
  const showOptions = false;

  const selectTypeAheadOption = () => {};
  return (
    <div
      data-testid="lsm-input-box-container"
      className={`w-full lsm-input-box-container ${classes}`}
    >
      <label data-testid="lsm-input-box-label" htmlFor="lsm-input-box">
        {label}
      </label>
      <input
        id="lsm-input-box"
        data-testid={`lsm-input-box-${name}`}
        className="border-gray-300"
        name={name}
        type="text"
        placeholder={placeholderLabel}
        value={value}
        onChange={onChange}
      />
      {isCloseButtonNeeded && (
        <LsmButton
          classes="lms-input-box-inner-clear-button Ims-action-button"
          // TODO-LOOK INTO THIS CANT USE CONDITIONAL CODE DIRECTLY ON ASSIGNMENT
          action={onClear ?? onChange}
          icon={ICONS_DETAILS.CLEAR.ID}
          iconClasses={`${ICONS_DETAILS.CLEAR.CLASSES} fill-blue-600`}
        />
      )}
      {showOptions && options && (
        <ul className="lsm-input-box-typeahead">
          {options.map((option) => {
            return (
              <li
                className="lsm-input-box-options"
                key={option}
                onClick={() => selectTypeAheadOption()}
              >
                {options}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LsmInputBox;
