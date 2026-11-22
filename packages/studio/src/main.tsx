import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import { initI18n } from "./i18n/index.js";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");

// Load the UI language before first paint so non-English users see no English flash.
void initI18n().finally(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
