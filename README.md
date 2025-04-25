# bSOL Analytics Dashboard

## Features Overview

### Pages

#### Growth-Metrics

- **Users.tsx**
  - Displays user growth analytics for bSOL.
  - Integrates the `UsersChart` (showing bSOL holders over time) and `DepositorsWithdrawersChart` (showing depositors vs withdrawers).

#### Defi-Usage

- **Overview.tsx**

  - Shows protocol and pool distribution of bSOL usage.
  - Integrates `ProtocolDistributionChart` (deposits by protocol) and `PoolDistributionChart` (liquidity pool breakdown).

- **Pools.tsx**
  - Provides a detailed breakdown of bSOL usage across liquidity pools.
  - Uses `PoolDistributionChart` for visualization and a table for pool-level stats.

#### Profitabibliy-Analysis

- **Overview.tsx**

  - Compares APY and strategies for bSOL.
  - Integrates `ApyComparisonChart` and `StrategyComparisonChart` for visual comparison.
  - Lists top bSOL strategies by APY in a table.

- **Strategies.tsx**
  - Offers a detailed breakdown of bSOL strategy performance.
  - Uses `StrategyComparisonChart` for visual analysis and a table for strategy stats.

### Components

#### charts

- **protocol-distribution-chart.tsx**

  - Visualizes bSOL deposits by protocol using a radial bar chart.
  - Fetches real data from the Dune API.
  - Includes a custom legend and growth calculation.

- **bsol-sol-volume.tsx**

  - Displays bSOL trading volume (in SOL and USDC) over time.
  - Fetches real data from the Dune API via context.
  - Shows moving averages and price information.

- **users-chart.tsx**

  - Shows the total number of bSOL holders over time.
  - Fetches real data from the Dune API via context.
  - Displays daily, weekly, and monthly growth rates.

- **depositor-withdrawers.tsx**
  - Visualizes the number of depositors and withdrawers over time.
  - Fetches real data from the Dune API via context.
  - Shows net user change per period.

---

Simple Moving Average (SMA): Added a 3-day SMA to smooth daily TVL fluctuations, displayed as a blue line on the chart alongside the raw TVL (green line). This helps visualize the overall trend, especially for longer periods.
Linear Regression Slope: Calculated the slope of a best-fit line through all TVL data points to determine the trend direction ("Upward", "Downward", or "Stable" if |slope| < 1000). The percentage change is shown for reference (e.g., "Downward trend (by 6.92%)").
