import { useState } from "react";
import { BarChart, LineChart } from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ApyComparisonChart } from "@/components/charts/apy-comparison-chart";
import { StrategyComparisonChart } from "@/components/charts/strategy-comparison-chart";
import { HistoricalApyChart } from "@/components/charts/historical-apy-chart";
import Overview from "./Overview";
import Strategies from "./Strategies";
import Historical from "./Historical";
import Comparison from "./Comparison";

export function ProfitabilityAnalysis() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Profitability Analysis
        </h1>
        <p className="text-muted-foreground">
          Analysis of the profitability of various DeFi strategies involving
          bSOL
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
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

          <TabsContent value="strategies" className="mt-4">
            <Strategies timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="historical" className="mt-4">
            <Historical timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <Comparison timeRange={timeRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
