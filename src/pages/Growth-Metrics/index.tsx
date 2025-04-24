import { useState } from "react";
import { BarChart, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tvl from "./Tvl";
import Users from "./Users";
import BsolVolume from "./BsolVolume";
import Overview from "./Overview";

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
              <TabsTrigger value="staking">Bsol/Sol Volume</TabsTrigger>
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
            <Tvl />
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <Users />
          </TabsContent>

          <TabsContent value="staking" className="mt-4">
            <BsolVolume />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
