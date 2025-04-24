import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import TvlChartContextProvider from "./contexts/ChartContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="solblaze-theme">
      <TvlChartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TvlChartContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
