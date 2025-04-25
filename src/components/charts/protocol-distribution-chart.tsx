import { TrendingUp } from "lucide-react";
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
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { parseISO, format } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const DUNE_API_KEY = import.meta.env.VITE_DUNE_API_KEY;

// Define interfaces for strong typing
interface DuneAPIResponse {
  result: {
    rows: Array<{
      date: string;
      num_deposits: number;
      protocol: string;
    }>;
  };
}

interface ChartData {
  date: string;
  num_deposits: number;
  protocol: string;
}

interface AggregatedChartData {
  protocol: string;
  num_deposits: number;
  fill: string;
  opacity?: number;
  previousMonthDeposits?: number;
}

const protocolColors: Record<string, string> = {
  Jupiter: "#FF9500",  // Bright Orange
  Raydium: "#4D7CFE",  // Bright Blue
  Orca: "#60ECBD",     // Teal
  Marinade: "#FF6B8B", // Pink
  Solend: "#FFD166",   // Yellow
  Mango: "#CB5EEE",    // Purple
  // Add more protocols as needed
};

// Get color for a protocol (with fallback)
const getProtocolColor = (protocol: string): string => {
  return protocolColors[protocol] || `hsl(${Math.floor(Math.random() * 360)}, 80%, 65%)`;
};

// Custom Legend Component
const CustomLegend: React.FC<{
  data: AggregatedChartData[];
  onHover: (protocol: string | null) => void;
  selectedProtocol: string | null;
}> = ({ data, onHover, selectedProtocol }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {data.map((item) => (
        <div
          key={item.protocol}
          className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-all duration-200 ${
            selectedProtocol === item.protocol ? "bg-accent" : "hover:bg-accent/50"
          }`}
          onMouseEnter={() => onHover(item.protocol)}
          onMouseLeave={() => onHover(null)}
        >
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: item.fill }}
          />
          <span className="text-sm font-medium capitalize">{item.protocol}</span>
          <span className="text-sm text-muted-foreground ml-auto">
            {item.num_deposits.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// Skeleton loader component for the chart
const ChartSkeleton: React.FC = () => {
  return (
    <Card className="flex flex-col min-h-64 border-border/40 bg-card/95">
      <CardHeader className="items-center">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
          <div className="w-full lg:w-2/3">
            <div className="mx-auto h-80 w-full max-w-96 relative">
              {/* Circle skeleton for donut chart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-64 w-64 rounded-full" />
                {/* Inner circle for donut hole */}
                <div className="absolute h-32 w-32 rounded-full bg-card/95" />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            {/* Legend skeleton */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2 mb-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-6 pb-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
      </CardFooter>
    </Card>
  );
};

const ProtocolDepositsDonutChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProtocol, setHoveredProtocol] = useState<string | null>(null);

  // Function to normalize date string to ISO 8601 format
  const normalizeDateString = (dateStr: string): string => {
    if (!dateStr) return "";
    if (dateStr.includes("UTC")) {
      return dateStr.replace(" ", "T").replace(" UTC", "Z");
    }
    return dateStr;
  };

  // Fetch data from Dune API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.dune.com/api/v1/query/4985736/results?limit=1000",
          {
            headers: {
              "X-Dune-API-Key": DUNE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data: DuneAPIResponse = await response.json();
        
        // Transform API response to chart data format
        const transformedData: ChartData[] = data.result.rows.map((row) => ({
          date: row.date,
          num_deposits: row.num_deposits,
          protocol: row.protocol,
        }));

        setChartData(transformedData);
      } catch (err) {
        console.error("Failed to fetch data from Dune API:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate previous month's data for comparison
  const getMonthlyGrowthPercentage = (aggregatedData: AggregatedChartData[]): number => {
    const currentMonthData = aggregatedData;
    const previousMonthData = chartData.filter((item) => {
      const itemDate = parseISO(normalizeDateString(item.date));
      const currentDate = new Date();
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      return (
        itemDate.getFullYear() === previousMonth.getFullYear() &&
        itemDate.getMonth() === previousMonth.getMonth()
      );
    });

    const previousAggregatedData = Object.values(
      previousMonthData.reduce((acc: Record<string, AggregatedChartData>, item: ChartData) => {
        const protocol = item.protocol;
        if (!acc[protocol]) {
          acc[protocol] = {
            protocol,
            num_deposits: 0,
            fill: getProtocolColor(protocol),
          };
        }
        acc[protocol].num_deposits += item.num_deposits;
        return acc;
      }, {})
    );

    const currentTotal = currentMonthData.reduce((sum, item) => sum + item.num_deposits, 0);
    const previousTotal = previousAggregatedData.reduce((sum, item) => sum + item.num_deposits, 0);

    if (previousTotal === 0) {
      return 0; // Avoid division by zero
    }

    return ((currentTotal - previousTotal) / previousTotal) * 100;
  };

  const aggregatedData = useMemo(() => {
    const result = Object.values(
      chartData.reduce((acc: Record<string, AggregatedChartData>, item: ChartData) => {
        try {
          const protocol = item.protocol;
          
          if (!acc[protocol]) {
            acc[protocol] = {
              protocol,
              num_deposits: 0,
              fill: getProtocolColor(protocol),
              opacity: hoveredProtocol === null || hoveredProtocol === protocol ? 1 : 0.3,
            };
          }
          
          acc[protocol].num_deposits += item.num_deposits;
          acc[protocol].opacity = hoveredProtocol === null || hoveredProtocol === protocol ? 1 : 0.3;
          return acc;
        } catch (error) {
          console.error(`Failed to process item: ${JSON.stringify(item)}`, error);
          return acc;
        }
      }, {})
    );
    
    // Sort by deposits (descending)
    return result.sort((a, b) => b.num_deposits - a.num_deposits);
  }, [chartData, hoveredProtocol]);

  // Calculate date range for description
  const dateRange = useMemo(() => {
    const validDates = chartData
      .map((item) => {
        try {
          const normalizedDate = normalizeDateString(item.date);
          return parseISO(normalizedDate);
        } catch {
          return null;
        }
      })
      .filter((date): date is Date => date !== null && !isNaN(date.getTime()));

    if (validDates.length === 0) {
      return "Recent activity";
    }
    
    // Use getTime() to convert Date objects to numbers for min/max
    const minDate = new Date(Math.min(...validDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...validDates.map(d => d.getTime())));
    
    return `${format(minDate, "MMM d, yyyy")} - ${format(maxDate, "MMM d, yyyy")}`;
  }, [chartData]);

  // Create dynamic chart config based on protocols in data
  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {
      num_deposits: {
        label: "Deposits",
      },
    };
    
    // Add protocol-specific configs
    aggregatedData.forEach((item) => {
      config[item.protocol] = {
        label: item.protocol,
        color: item.fill,
      };
    });
    
    return config;
  }, [aggregatedData]);

  // Calculate growth percentage
  const growthPercentage = useMemo(() => {
    return getMonthlyGrowthPercentage(aggregatedData);
  }, [aggregatedData]);

  // Custom tooltip formatter function - properly typed for Recharts
  const tooltipFormatter = (value: any) => {
    if (typeof value === 'number') {
      return [`${value.toLocaleString()} deposits`, ''];
    }
    return [value, ''];
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (error && chartData.length === 0) {
    return (
      <Card className="flex flex-col border-border/40 bg-card/95">
        <CardHeader className="items-center">
          <CardTitle>Deposits by Protocol</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col border-border/40 bg-card/95">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">Deposits by Protocol</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
          <div className="w-full lg:w-2/3">
            <ChartContainer config={chartConfig} className="mx-auto h-80 w-full max-w-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent 
                        hideLabel 
                        formatter={tooltipFormatter}
                      />
                    }
                  />
                  <Pie
                    data={aggregatedData}
                    dataKey="num_deposits"
                    nameKey="protocol"
                    innerRadius="50%"
                    outerRadius="90%"
                    paddingAngle={2}
                    cornerRadius={5}
                    animationDuration={1500}
                    label={({percent }) => 
                      percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : ""}
                    labelLine={false}
                  >
                    {aggregatedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill}
                        opacity={entry.opacity}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="w-full lg:w-1/3">
            <CustomLegend
              data={aggregatedData}
              onHover={setHoveredProtocol}
              selectedProtocol={hoveredProtocol}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-6 pb-4">
        <div className="text-sm">
          <div className="flex items-center gap-2 font-medium">
            {growthPercentage > 0 ? (
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{growthPercentage.toFixed(1)}% this month
              </div>
            ) : (
              <div className="flex items-center text-red-400">
                <TrendingUp className="h-4 w-4 rotate-180 mr-1" />
                {growthPercentage.toFixed(1)}% this month
              </div>
            )}
          </div>
        </div>
        <div className="text-sm font-medium">
          Total: {aggregatedData.reduce((sum, item) => sum + item.num_deposits, 0).toLocaleString()} deposits
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProtocolDepositsDonutChart;