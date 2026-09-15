import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../../src/css/sitestencil.css";
import "./gallery.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
