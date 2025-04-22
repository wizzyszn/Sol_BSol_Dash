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

import Overview from "./Overview";
import Protocols from "./Protocols";
import Pools from "./Pools";
import Trends from "./Trends";

export function DefiUsage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          DeFi Usage Analysis
        </h1>
        <p className="text-muted-foreground">
          Detailed information on where bSOL is being utilized within the DeFi
          landscape
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
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

          <TabsContent value="protocols" className="mt-4">
            <Protocols timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="pools" className="mt-4">
            <Pools timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Trends timeRange={timeRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
