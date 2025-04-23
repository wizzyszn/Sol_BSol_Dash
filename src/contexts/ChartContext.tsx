import { BlazeStakeData } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import React, {
  createContext,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
interface ChartContextProviderProps {
  children: React.ReactNode;
}
interface InitialContextStateInt {
  Tvl: {
    isLoading: boolean;
    error: string | null;
    dataWithSMA: TvlEntryWithSMA[];
    trendAnalysis: TrendAnalysis;
    dateRange: {
      start: string;
      end: string;
    } | null;
    currentTvl: number | null,
    percentChange : number | null
  };
}
// Type definitions based on JSON structure
interface TvlEntry {
  date: number; // UNIX timestamp in seconds
  totalLiquidityUSD: number;
}

interface TvlEntryWithSMA extends TvlEntry {
  sma: number | null;
}
interface TrendAnalysis {
  slope: number;
  percentChange: number | null;
  trendText: string;
  trendIcon: JSX.Element | null;
}
const InitialContextState: InitialContextStateInt = {
  Tvl: {
    isLoading: false,
    error: null,
    dataWithSMA: [],
    trendAnalysis: {
      slope: 0,
      percentChange: null,
      trendText: "",
      trendIcon: null,
    },
    dateRange: null,
    currentTvl: null,
    percentChange : null
  },
};
export const ChartContext =
  createContext<InitialContextStateInt>(InitialContextState);

const ChartContextProvider = ({ children }: ChartContextProviderProps) => {
  const [chartData, setChartData] = useState<BlazeStakeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch data only once when component mounts
  useEffect(() => {
    const fetchTvl = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.llama.fi/protocol/BlazeStake"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch TVL data: ${response.status}`);
        }
        const data: BlazeStakeData = await response.json();
        setChartData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching TVL data:", err);
        setError("Failed to load TVL data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTvl();
  }, []);
  // Memoize the TVL data extraction to avoid recalculation on each render
  const tvlData = useMemo(() => {
    return chartData?.chainTvls?.Solana?.tvl ?? [];
  }, [chartData]);
  const currentTvl = useMemo(() => {
    return chartData?.currentChainTvls["Solana"] ?? null
  }, [chartData])
  // Memoize SMA calculation
  const calculateSMA = useCallback(
    (data: TvlEntry[], window: number = 3): TvlEntryWithSMA[] => {
      return data.map((entry, index, arr) => {
        if (index < window - 1) {
          return { ...entry, sma: null };
        }
        const slice = arr.slice(index - window + 1, index + 1);
        const sma =
          slice.reduce((sum, item) => sum + item.totalLiquidityUSD, 0) / window;
        return { ...entry, sma };
      });
    },
    []
  );
  // Memoize the data with SMA to prevent recalculation on every render
  const dataWithSMA = useMemo(() => {
    return calculateSMA(tvlData, 3);
  }, [tvlData, calculateSMA]);
  // Calculate linear regression slope to determine trend - memoized
  const calculateTrend = useCallback((data: TvlEntry[]): TrendAnalysis => {
    if (data.length < 2) {
      return {
        slope: 0,
        percentChange: null,
        trendText: "Stable",
        trendIcon: null,
      };
    }

    const x: number[] = data.map((_, i) => i);
    const y: number[] = data.map((d) => d.totalLiquidityUSD);
    const n: number = x.length;
    const sumX: number = x.reduce((a, b) => a + b, 0);
    const sumY: number = y.reduce((a, b) => a + b, 0);
    const sumXY: number = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumXX: number = x.reduce((a, b) => a + b * b, 0);

    const slope: number = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);

    const firstTVL: number = data[0].totalLiquidityUSD;
    const lastTVL: number = data[data.length - 1].totalLiquidityUSD;
    const percentChange: number | null =
      firstTVL > 0 ? ((lastTVL - firstTVL) / firstTVL) * 100 : null;

    const trendText: string =
      slope === 0
        ? "Stable"
        : Math.abs(slope) < 1000
        ? "Stable"
        : slope > 0
        ? "Upward"
        : "Downward";

    const trendIcon: JSX.Element | null =
      slope === 0 || Math.abs(slope) < 1000 ? null : slope > 0 ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      );

    return { slope, percentChange, trendText, trendIcon };
  }, []);
 
  // Memoize trend calculation
  const trendAnalysis = useMemo(() => {
    return calculateTrend(tvlData);
  }, [tvlData, calculateTrend]);
  const {percentChange} = trendAnalysis
    // Memoize date range formatting
  const dateRange = useMemo(() => {
    if (tvlData.length === 0) return null;

    const formatDate = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return {
      start: formatDate(tvlData[0].date),
      end: formatDate(tvlData[tvlData.length - 1].date),
    };
  }, [tvlData]);

  const value: InitialContextStateInt = {
    Tvl: {
      isLoading,
      error,
      dataWithSMA,
      trendAnalysis,
      dateRange,
      currentTvl,
      percentChange
    },
  };
  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};

export default ChartContextProvider;

export const useChartContext = () => {
  const context = useContext(ChartContext);

  if (context === undefined)
    throw new Error("useChartContext must be used within a ChartProvider");

  return context;
};
