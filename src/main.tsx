import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/_index.scss";

createRoot(document.getElementById("root")!).render(
  // <StrictMode >
  <App />
  // </StrictMode>
);
