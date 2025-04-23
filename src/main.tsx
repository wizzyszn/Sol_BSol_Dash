import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter } from "react-router-dom";
import ChartContextProvider from "./contexts/ChartContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="solblaze-theme">
      <ChartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChartContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
