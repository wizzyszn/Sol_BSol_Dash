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
import { useUsersChartContext } from "@/contexts/UsersChartContext";
import React from "react";

interface ChartData {
  week: string;
  depositers: number;
  withdrawers: number;
}

interface FormattedChartData extends ChartData {
  date: Date;
  formattedDate: string;
  fullDate: string;
}

interface DepositorsWithdrawersChartProps {
  data?: ChartData[];
}

// Skeleton loader component
const ChartSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-64" />
    <div className="h-[400px] w-full">
      <Skeleton className="h-full w-full rounded" />
    </div>
    <div className="flex justify-center space-x-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

const DepositorsWithdrawersChart: React.FC<
  DepositorsWithdrawersChartProps
> = () => {
  const {
    customers: { loading, data: formattedData, error },
  } = useUsersChartContext();

  // Custom tooltip component with strong typing
  const CustomTooltip = React.useMemo(() => {
    return ({ active, payload }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        const data: FormattedChartData = payload[0]
          .payload as FormattedChartData;
        return (
          <div className="bg-white p-3 border rounded shadow-sm">
            <p className="font-bold">{data.fullDate}</p>
            <p className="text-emerald-600">Depositors: {data.depositers}</p>
            <p className="text-rose-600">Withdrawers: {data.withdrawers}</p>
            <p className="text-gray-600 text-sm">
              Net: {data.depositers - data.withdrawers > 0 ? "+" : ""}
              {data.depositers - data.withdrawers}
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
          <CardTitle>Depositors vs Withdrawers Over Time</CardTitle>
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
          <CardTitle>Depositors vs Withdrawers Over Time</CardTitle>
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Depositors vs Withdrawers Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="depositGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="withdrawGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.1} />
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
                tickCount={6}
                interval="preserveStartEnd"
              />
              <YAxis
                label={{
                  value: "Number of Users",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  style: { fontSize: 12, fill: "#6b7280" },
                }}
                tick={{ fontSize: 12, fill: "#6b7280" }}
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
                dataKey="depositers"
                name="Depositors"
                stackId="1"
                stroke="#10b981"
                fill="url(#depositGradient)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="withdrawers"
                name="Withdrawers"
                stackId="1"
                stroke="#e11d48"
                fill="url(#withdrawGradient)"
                fillOpacity={1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepositorsWithdrawersChart;
