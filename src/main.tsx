import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { initializeTheme } from "./lib/theme";
import App from "./App.tsx";

// Initialize theme before rendering the app
initializeTheme();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
