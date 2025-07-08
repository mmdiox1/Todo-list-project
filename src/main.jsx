import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { TodoProvider } from "./Contexts/TodoContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <TodoProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TodoProvider>
  </HashRouter>
);
