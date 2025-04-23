import { Info } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Skeleton } from "@/components/ui/skeleton";
import { useChartContext } from "@/contexts/ChartContext";

const chartConfig = {
  tvl: {
    label: "TVL (USD)",
    color: "#4ade80",
  },
  sma: {
    label: "3-Day SMA (USD)",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function TvlChart() {
  const {
    Tvl: {
      isLoading,
      error,
      dataWithSMA,
      trendAnalysis,
      dateRange,
    },
  } = useChartContext();

  // Loading skeleton UI
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full rounded-md" />
          <div className="flex justify-center gap-4 mt-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>BlazeStake TVL</CardTitle>
          <CardDescription>
            Total Value Locked in USD for BlazeStake on Solana
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="text-red-500 mb-2">Error loading data</div>
          <p className="text-sm text-muted-foreground text-center">{error}</p>
          <button
            className="mt-4 px-4 py-2 rounded bg-primary text-primary-foreground"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BlazeStake TVL</CardTitle>
        <div className="flex items-center gap-2">
          <CardDescription>
            Total Value Locked in USD for BlazeStake on Solana
          </CardDescription>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-2">
                <p className="text-sm">
                  <strong>Total Value Locked (TVL)</strong> is the total USD
                  value of assets staked in BlazeStake.{" "}
                  <strong>Simple Moving Average (SMA)</strong> is the 3-day
                  average of TVL, smoothing daily fluctuations to show the
                  overall trend.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dataWithSMA}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) =>
                new Date(value * 1000).getFullYear().toString()
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              orientation="left"
              tickFormatter={(value: number) =>
                `$${(value / 1000).toFixed(0)}K`
              }
              width={50}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={() => ""}
                  formatter={(value, name) => (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor:
                            name === "TVL (USD)" ? "#4ade80" : "#3b82f6",
                        }}
                      />
                      <span>
                        {name}:{" "}
                        {value == null
                          ? "N/A"
                          : `$${Number(value).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </span>
                    </div>
                  )}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="totalLiquidityUSD"
              type="monotone"
              fill="#4ade80"
              fillOpacity={0.5}
              stroke="#22c55e"
              strokeWidth={2}
              name="TVL (USD)"
            />
            <Area
              dataKey="sma"
              type="monotone"
              fill="#3b82f6"
              fillOpacity={0.2}
              stroke="#2563eb"
              strokeWidth={2}
              name="3-Day SMA (USD)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#4ade80" }}
            ></div>
            <span className="text-sm text-muted-foreground">TVL (USD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: "#3b82f6" }}
            ></div>
            <span className="text-sm text-muted-foreground">
              3-Day SMA (USD)
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendAnalysis.percentChange !== null && (
                <>
                  {trendAnalysis.trendText} trend{" "}
                  {trendAnalysis.percentChange !== null &&
                    `(by ${Math.abs(trendAnalysis.percentChange).toFixed(
                      2
                    )}%)`}{" "}
                  {trendAnalysis.trendIcon}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {dateRange && (
                <>
                  {dateRange.start} - {dateRange.end}
                </>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
