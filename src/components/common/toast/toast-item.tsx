import { ICONS_DETAILS } from "../../../util/constants";
import Icons from "../icons";
import LsmButton from "../lsm-button";
import { Toast } from "./toast-context";

interface ToastItemType {
  toast: Toast;

  onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemType) => {
  const isHTMLString =
    typeof toast.message === "string" &&
    /<V?[a-z][\s\S]*>/i.test(toast.message);
  return (
    <div className="toast-container bg-[#ffff] p-3 border border-neutral-200 text-zinc-600 flex gap-4 items-center rounded-md mb-3">
      <span className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
        <Icons id="check" iconSize="small" classes="text-white" />
      </span>

      <div className="max-w-sm text-sm">
        {isHTMLString ? (
          <div dangerouslySetInnerHTML={{ __html: toast.message }}></div>
        ) : (
          toast.message
        )}
      </div>

      <span>
        <LsmButton
          action={onClose}
          icon={ICONS_DETAILS.CLEAR.ID}
          classes="w-7 h-7 bg-white"
          iconClasses="fill-blue-600"
        />
      </span>
    </div>
  );
};

export default ToastItem;
