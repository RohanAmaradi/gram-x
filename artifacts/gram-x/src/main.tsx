import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
