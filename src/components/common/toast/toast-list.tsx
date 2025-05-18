import { Toast } from "./toast-context";
import ToastItem from "./toast-item";
import useToast from "./use-toast";

interface ToastListProps {
  toasts: Toast[];
}

const ToastList = ({ toasts }: ToastListProps) => {
  const { removeToast } = useToast();

  return (
    /**
     * So here position absolute will be relative to the screen not to the container
     *  Because its rendered next to where it is wrapped
     *   So eg
     *  <ToastProvider>
     *     <App />
     *  </ToastProvider>
     *  So here the content inside ToastProvider will be sibling to content inside App.
     *
     *  So to render content of ToastProvider inside App
     *  We need to use ref or react portals.
     *
     *  Will implement both ref and portals
     *
     *  Well we can just wrap the code inside a div and add position relative on this div
     *
     *  Second issue here is that even when there is no modal pop up it is showing <div
     *  class="absolute bottom-2 right-4 z-50"></div> in DOM.
     *  Debug this and look for fix - May be react portals not sure
     *  <div class="relative">
     *      <ToastProvider>
     *          <App />
     *      </ToastProvider>
     *  </div>
     */
    <div className="absolute bottom-2 right-4 z-50">
      {toasts.map((toast: Toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastList;
