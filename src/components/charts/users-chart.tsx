import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsersChartContext } from "@/contexts/UsersChartContext";

// Define the data structure based on the API response
interface HolderData {
  date: string;
  holder_count: number;
  holder_growth_1D: number | null;
  holder_growth_7D: number | null;
  holder_growth_30D: number | null;
  holder_growth_1Y: number | null;
}


// Custom tooltip props
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: HolderData;
  }>;
  label?: string;
}

const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  return number.toString();
};

// Helper function to safely format growth values
const formatGrowth = (value: number | null | undefined): string => {
  if (value == null || isNaN(Number(value))) {
    return "N/A";
  }
  return `${Number(value).toFixed(2)}%`;
};

// Skeleton loader component for the chart
const ChartSkeleton: React.FC = () => (
  <div className="h-80 w-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-full w-full rounded" />
  </div>
);

const UsersChart: React.FC = () => {
  const {
    holders: { loading, error, data },
  } = useUsersChartContext();
  // Memoize tooltip component to prevent unnecessary re-renders
  const CustomTooltip = React.useMemo(() => {
    return ({ active, payload, label }: CustomTooltipProps) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-black p-4 rounded shadow border ">
            <p className="font-bold text-white">
              {format(new Date(label || ""), "MMM dd, yyyy")}
            </p>
            <p className="text-blue-400">{`Holders: ${formatNumber(
              data.holder_count
            )}`}</p>
            <p className="text-white text-sm">{`Daily growth: ${formatGrowth(
              data.holder_growth_1D
            )}`}</p>
            <p className="text-white-600 text-sm">{`Weekly growth: ${formatGrowth(
              data.holder_growth_7D
            )}`}</p>
            <p className="text-white text-sm">{`Monthly growth: ${formatGrowth(
              data.holder_growth_30D
            )}`}</p>
          </div>
        );
      }
      return null;
    };
  }, []);

  // Error component
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>bSOL User Growth</CardTitle>
          <CardDescription>
            Total number of bSOL holders over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80 bg-red-50 rounded text-red-600">
            <p>Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>bSOL User Growth</CardTitle>
        <CardDescription>
          Total number of bSOL holders over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <ChartSkeleton />
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="holderGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date: string) =>
                    format(new Date(date), "MMM dd")
                  }
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickCount={6}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  width={40}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="holder_count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#holderGradient)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersChart;
