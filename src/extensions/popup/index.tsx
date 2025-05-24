import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../../App";
import "../../index.css";

createRoot(window.document.querySelector("#app-container")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
