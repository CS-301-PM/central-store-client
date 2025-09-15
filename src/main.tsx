import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { UserContextProvider } from "./contexts/UserContext.tsx";
import { RequestManagementProvider } from "./contexts/RequestContext.tsx";
import { StockManagementProvider } from "./contexts/StockManagementContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RequestManagementProvider>
      <StockManagementProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </StockManagementProvider>
    </RequestManagementProvider>
  </StrictMode>
);
