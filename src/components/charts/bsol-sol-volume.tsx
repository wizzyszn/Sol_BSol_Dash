import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { useBsolSolContext } from "@/contexts/BsolSolContext";

// Define interfaces for strong typing
interface ChartData {
  date: string;
  daily_volume_bsol: number;
  bsol_price_in_sol: number;
  bsol_price_usd: number;
  bsol_market_cap_usd: number;
}

interface FormattedChartData extends ChartData {
  parsedDate: Date;
  formattedDate: string;
  fullDate: string;
  volume_sol: number;
  volume_usdc: number;
}

// Skeleton loader component
const ChartSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-72" />
    <div className="h-[400px] w-full">
      <Skeleton className="h-full w-full rounded" />
    </div>
    <div className="flex justify-center space-x-4 mt-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

const BSOLVolumeChart: React.FC = () => {
  const { loading, error, data: formattedData } = useBsolSolContext();
  // Custom tooltip component with strong typing
  const CustomTooltip = React.useMemo(() => {
    return ({ active, payload }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        const data: FormattedChartData = payload[0]
          .payload as FormattedChartData;
        const formatCurrency = (value: number) =>
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);

        return (
          <div className="bg-black p-3 border rounded shadow-sm">
            <p className="font-bold">{data.fullDate}</p>
            <p className="text-indigo-600">
              Volume (SOL): {formatCurrency(data.volume_sol)}
            </p>
            <p className="text-teal-600">
              Volume (USDC): ${formatCurrency(data.volume_usdc)}
            </p>
            <p className="text-white text-xs mt-1">
              bSOL Price: ${formatCurrency(data.bsol_price_usd)}
            </p>
          </div>
        );
      }
      return null;
    };
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>bSOL Trading Volume (SOL & USDC)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  // Handle error state
  if (error || formattedData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>bSOL Trading Volume (SOL & USDC)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[400px] bg-red-50 rounded-md">
            <p className="text-red-600 text-center">
              {error || "No valid data available to display the chart"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate moving average for smoother lines
  const calculateMovingAverage = (
    data: FormattedChartData[],
    key: keyof FormattedChartData,
    windowSize: number = 3
  ) => {
    return data.map((item, index) => {
      if (index < windowSize - 1) return item;

      let sum = 0;
      for (let i = 0; i < windowSize; i++) {
        const val = data[index - i][key];
        sum += typeof val === "number" ? val : 0;
      }

      return {
        ...item,
        [`${key}_ma`]: sum / windowSize,
      };
    });
  };

  // Apply moving average to volume data
  const smoothedData = calculateMovingAverage(
    calculateMovingAverage(formattedData, "volume_sol"),
    "volume_usdc"
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>bSOL Trading Volume (SOL & USDC)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={smoothedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="volumeSolGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="volumeUsdcGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                opacity={0.4}
              />
              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                interval="preserveStartEnd"
                minTickGap={15}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Volume (SOL)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  style: { fontSize: 12, fill: "#4f46e5" },
                }}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value: number) =>
                  value.toLocaleString("en-US", { maximumFractionDigits: 0 })
                }
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Volume (USDC)",
                  angle: 90,
                  position: "insideRight",
                  offset: -5,
                  style: { fontSize: 12, fill: "#14b8a6" },
                }}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value: number) =>
                  "$" +
                  value.toLocaleString("en-US", { maximumFractionDigits: 0 })
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="volume_sol"
                name="Volume (SOL)"
                stroke="#4f46e5"
                fill="url(#volumeSolGradient)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                yAxisId="left"
              />
              <Area
                type="monotone"
                dataKey="volume_usdc"
                name="Volume (USDC)"
                stroke="#14b8a6"
                fill="url(#volumeUsdcGradient)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                yAxisId="right"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BSOLVolumeChart;
