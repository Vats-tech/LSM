import React, { createContext, useCallback, useState } from "react";
import ToastList from "./toast-list";

export interface Toast {
  id: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToasts: (message: string, duration?: number) => void;
  clearToasts: () => void;
  removeToast: (id: string) => void;
}

// TODO - Look for fix of this warning on below ToastContext variable - Fast refresh only works when a file only exports components. Move your React context(s) to a separate
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToasts = useCallback((message: string, duration: number = 8000) => {
    const id = `${Date.now()} - ${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, duration }]);

    // TODO - Look why in ember run Task is suggested instead of setTimeout
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ addToasts, clearToasts, removeToast }}>
      {children}
      <ToastList toasts={toasts} />{" "}
    </ToastContext.Provider>
  );
};
