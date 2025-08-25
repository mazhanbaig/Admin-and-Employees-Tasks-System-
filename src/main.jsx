import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // ✅ import router
import "./App.css";
import App from "./App.jsx";
import { TaskProvider } from "../src/context/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <TaskProvider>
    <BrowserRouter>       {/* ✅ Wrap the whole app */}
      <App />
    </BrowserRouter>
  </TaskProvider>
  // </StrictMode>
);
