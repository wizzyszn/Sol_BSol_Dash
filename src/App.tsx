import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./pages/dashboard-layout";
import { GrowthMetrics } from "./pages/Growth-Metrics";
import { DefiUsage } from "./pages/defi-usage";
import { ProfitabilityAnalysis } from "./pages/profitability-analysis";
import { TransactionDecoder } from "./pages/transaction-decoder";
import "./index.css"
function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<GrowthMetrics />} />
        <Route path="defi-usage" element={<DefiUsage />} />
        <Route path="profitability" element={<ProfitabilityAnalysis />} />
        <Route path="transaction-decoder" element={<TransactionDecoder />} />
      </Route>
    </Routes>
  );
}

export default App;
