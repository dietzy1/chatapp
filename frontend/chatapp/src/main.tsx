import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryClientProvider from "./api/client/query.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider delayDuration={100}>
        <ReactQueryClientProvider>
          <BrowserRouter basename="/">
            <Routes />
          </BrowserRouter>
        </ReactQueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
