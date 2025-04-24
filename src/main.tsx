import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import TvlChartContextProvider from "./contexts/TvlChartContext.tsx";
import { UsersChartContextProvider } from "./contexts/UsersChartContext.tsx";
import { BsolSolContextProvider } from "./contexts/BsolSolContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="solblaze-theme">
      <TvlChartContextProvider>
        <UsersChartContextProvider>
          <BsolSolContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BsolSolContextProvider>
        </UsersChartContextProvider>
      </TvlChartContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
