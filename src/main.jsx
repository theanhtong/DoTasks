import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import DoTasks from "./DoTasks";

import TodoProvider from "./contexts/TodoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoProvider>
      <DoTasks></DoTasks>
    </TodoProvider>
  </StrictMode>
);
