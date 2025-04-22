import { useState } from "react";
import { BarChart, LineChart, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MetricCard } from "@/components/metric-card";
import { TvlChart } from "@/components/charts/tvl-chart";
import { UsersChart } from "@/components/charts/users-chart";
import { StakingRatioChart } from "@/components/charts/staking-ratio-chart";
import { MarketShareChart } from "@/components/charts/market-share-chart";
import Overview from "./Overview";
import Tvl from "./Tvl";
import Users from "./Users";
import Staking from "./Staking";

export function GrowthMetrics() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Growth Metrics</h1>
        <p className="text-muted-foreground">
          Key metrics illustrating bSOL's growth and adoption over time
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tvl">TVL</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="staking">Staking Ratio</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <BarChart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LineChart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Overview timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="tvl" className="mt-4">
            <Tvl timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <Users timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="staking" className="mt-4">
            <Staking timeRange={timeRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
