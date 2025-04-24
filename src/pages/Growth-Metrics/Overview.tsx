import { MarketShareChart } from "@/components/charts/market-share-chart";
import BSOLVolumeChart from "@/components/charts/bsol-sol-volume";
import { TvlChart } from "@/components/charts/tvl-chart";
import UsersChart from "@/components/charts/users-chart";
import { MetricCard } from "@/components/metric-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTvlChartContext } from "@/contexts/TvlChartContext";
import { LockKeyhole, Wallet } from "lucide-react";
import React from "react";
type Props = {
  timeRange: string;
};
function Overview({ timeRange }: Props) {
  const {
    Tvl: { currentTvl, percentChange },
  } = useTvlChartContext();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Value Locked"
          value={currentTvl ? `$${currentTvl}` : ""}
          change={
            percentChange !== null && isNaN(percentChange)
              ? `-%${Math.abs(percentChange).toFixed(2)}`
              : `+%${Math.abs(percentChange as number).toFixed(2)}`
          }
          trend="up"
          description="vs. previous period"
          icon={LockKeyhole}
        />
        <MetricCard
          title="Total Users"
          value="24,892"
          change="+8.7%"
          trend="up"
          description="vs. previous period"
          icon={Wallet}
        />
        <MetricCard
          title="Market Share"
          value="14.2%"
          change="+2.1%"
          trend="up"
          description="of Solana LSTs"
          icon={Wallet}
        />
        <MetricCard
          title="Staking Ratio"
          value="0.89"
          change="-0.02"
          trend="down"
          description="bSOL/SOL ratio"
          icon={Wallet}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>TVL Growth</CardTitle>
            <CardDescription>
              Total Value Locked in bSOL over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TvlChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              Number of unique bSOL holders over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Staking Ratio</CardTitle>
            <CardDescription>
              bSOL to SOL exchange rate over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BSOLVolumeChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
            <CardDescription>
              bSOL's share among Solana liquid staking tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MarketShareChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default React.memo(Overview);
