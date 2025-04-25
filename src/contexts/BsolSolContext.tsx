import React, { createContext, useContext, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
const DUNE_API_KEY = import.meta.env.VITE_DUNE_API_KEY;
 
// Define interfaces for strong typing
interface ChartData {
  date: string;
  daily_volume_bsol: number;
  bsol_price_in_sol: number;
  bsol_price_usd: number;
  bsol_market_cap_usd: number;
}

// Define API response structure
interface DuneApiResponse {
  result: {
    rows: ChartData[];
  };
}

interface FormattedChartData extends ChartData {
  parsedDate: Date;
  formattedDate: string;
  fullDate: string;
  volume_sol: number;
  volume_usdc: number;
}

interface BsolSolContextProviderProps {
  children: React.ReactNode;
}
interface BsolSolContextStateInt {
  loading: boolean;
  error: string | null;
  data: FormattedChartData[];
}
export const BsolSolContext = createContext<BsolSolContextStateInt>({
  loading: true,
  error: null,
  data: [],
});
// Function to normalize date string to ISO 8601 format
const normalizeDateString = (dateStr: string): string => {
  // Replace space with 'T' and 'UTC' with 'Z'
  return dateStr.replace(" ", "T").replace(" UTC", "Z");
};
export const BsolSolContextProvider = ({
  children,
}: BsolSolContextProviderProps) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.dune.com/api/v1/query/4983078/results?limit=1000",
          {
            headers: {
              "X-Dune-API-Key": DUNE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const apiData: DuneApiResponse = await response.json();
        setData(apiData.result.rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform data with error handling and memoization
  const formattedData: FormattedChartData[] = React.useMemo(() => {
    return (
      data
        .map((item: ChartData) => {
          try {
            const normalizedDate = normalizeDateString(item.date);
            const parsedDate = parseISO(normalizedDate);
            if (isNaN(parsedDate.getTime())) {
              throw new Error(`Invalid date: ${item.date}`);
            }
            return {
              ...item,
              parsedDate,
              formattedDate: format(parsedDate, "MMM d"),
              fullDate: format(parsedDate, "MMM d, yyyy"),
              volume_sol: item.daily_volume_bsol * item.bsol_price_in_sol,
              volume_usdc: item.daily_volume_bsol * item.bsol_price_usd,
            };
          } catch (error) {
            console.error(`Failed to parse date for item: ${item.date}`, error);
            return null;
          }
        })
        .filter((item): item is FormattedChartData => item !== null)
        // Sort data by date in ascending order
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
    );
  }, [data]);
  const value: BsolSolContextStateInt = {
    data: formattedData,
    loading,
    error,
  };
  return (
    <BsolSolContext.Provider value={value}>{children}</BsolSolContext.Provider>
  );
};

export const useBsolSolContext = () => {
  const context = useContext(BsolSolContext);
  if (context === undefined) {
    throw new Error(
      "BsolSolcontext must be used within a BsolSolContextProvider"
    );
  }
  return context;
};
