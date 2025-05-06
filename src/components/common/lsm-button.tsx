import { ReactNode } from "react";
import Icons from "./icons";
import { isEmpty } from "../../util/util";

interface lsmButtonTypes {
  id?: string;
  label?: string;
  action?: (arg0: any) => void;
  classes?: string;
  icon?: string;
  iconClasses?: string;
  iconSize?: string;
  children?: ReactNode;
  overrideButtonClass?: string;
  dataTestId?: string;
}

const LsmButton = ({
  id,
  label,
  icon,
  action,
  classes,
  iconSize,
  iconClasses,
  dataTestId,
  children,
}: lsmButtonTypes) => {
  /**
   * Button will have different styles when it has icon as child node
   * @returns style classes
   */
  const buttonClasses = (): string => {
    return isEmpty(icon)
      ? "capitalize text-end py-2 px-4 rounded"
      : "w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200";
  };

  return (
    <button
      data-testid={dataTestId ?? `lsm-button-${id}`}
      onClick={action}
      className={`${buttonClasses()} ${classes} test-btn-cls`}
    >
      {children}
      {icon && <Icons id={icon} iconSize={iconSize} classes={iconClasses} />}
      {label}
    </button>
  );
};

export default LsmButton;
