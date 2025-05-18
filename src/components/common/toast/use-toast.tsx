import { useContext } from "react";
import { ToastContext } from "./toast-context";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useContext must be used within a ToastProvider");
  }

  return context;
};

export default useToast;
