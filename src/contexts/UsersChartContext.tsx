import React, { createContext, useContext, useEffect, useState } from "react";

import { format, parseISO } from "date-fns";
interface HolderData {
  date: string;
  holder_count: number;
  holder_growth_1D: number | null;
  holder_growth_7D: number | null;
  holder_growth_30D: number | null;
  holder_growth_1Y: number | null;
}

const DUNE_API_KEY = import.meta.env.VITE_DUNE_API_KEY;
 
// API response structure from Dune
interface HoldersDuneApiResponse {
  result: {
    rows: Array<{
      date: string;
      holder_count: number;
      holder_growth_1D: number | null;
      holder_growth_7D: number | null;
      holder_growth_30D: number | null;
      holder_growth_1Y: number | null;
    }>;
  };
}
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

// Define API response structure
interface DuneApiResponse {
  result: {
    rows: ChartData[];
  };
}
interface UsersChartContextStateInt {
  holders: {
    data: HolderData[];
    loading: boolean;
    error: string | null;
  };
  customers: {
    data: ChartData[];
    loading: boolean;
    error: string | null;
  };
}
const UsersChartContext = createContext<UsersChartContextStateInt>({
  holders: {
    data: [],
    loading: true,
    error: null,
  },
  customers: {
    data: [],
    loading: false,
    error: null,
  },
});

interface UsersChartContextProviderProps {
  children: React.ReactNode;
}
// Function to normalize date string to ISO 8601 format
const normalizeDateString = (dateStr: string): string => {
  return dateStr.replace(" ", "T").replace(" UTC", "Z");
};
export const UsersChartContextProvider = ({
  children,
}: UsersChartContextProviderProps) => {
  const [holderData, setHolderData] = useState<HolderData[]>([]);
  const [holderLoading, setHolderLoading] = useState(true);
  const [holderError, setHolderError] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<ChartData[]>([]);
  const [customerLoading, setCustomerLoading] = useState<boolean>(true);
  const [customerError, setCustomerError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.dune.com/api/v1/query/4998741/results?limit=2000",
          {
            headers: {
              "X-Dune-API-Key": DUNE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: HoldersDuneApiResponse = await response.json();

        // Transform API data to match HolderData interface
        const transformedData: HolderData[] = result.result.rows
          .map((row) => ({
            date: row.date,
            holder_count: row.holder_count,
            holder_growth_1D: row.holder_growth_1D,
            holder_growth_7D: row.holder_growth_7D,
            holder_growth_30D: row.holder_growth_30D,
            holder_growth_1Y: row.holder_growth_1Y,
          }))
          // Sort by date to ensure proper display
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setHolderData(transformedData);
      } catch (err) {
        setHolderError("Failed to fetch data");
        console.error(err);
      } finally {
        setHolderLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.dune.com/api/v1/query/4979449/results?limit=1000",
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
        setCustomerData(apiData.result.rows);
      } catch (err) {
        setCustomerError(
          err instanceof Error ? err.message : "Failed to fetch data"
        );
        console.error("Error fetching data:", err);
      } finally {
        setCustomerLoading(false);
      }
    };

    fetchData();
  }, []);
  // Transform data with error handling
  const formattedData: FormattedChartData[] = React.useMemo(() => {
    return (
      customerData
        .map((item: ChartData) => {
          try {
            const normalizedDate = normalizeDateString(item.week);
            const parsedDate = parseISO(normalizedDate);
            if (isNaN(parsedDate.getTime())) {
              throw new Error(`Invalid date: ${item.week}`);
            }
            return {
              ...item,
              date: parsedDate,
              formattedDate: format(parsedDate, "MMM yyyy"),
              fullDate: format(parsedDate, "MMM d, yyyy"),
            };
          } catch (error) {
            console.error(`Failed to parse date for item: ${item.week}`, error);
            return null;
          }
        })
        .filter((item): item is FormattedChartData => item !== null)
        // Sort data by date
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    );
  }, [customerData]);
  const value: UsersChartContextStateInt = {
    holders: {
      data: holderData,
      loading: holderLoading,
      error: holderError,
    },
    customers: {
      data: formattedData,
      loading: customerLoading,
      error: customerError,
    },
  };
  return (
    <UsersChartContext.Provider value={value}>
      {children}
    </UsersChartContext.Provider>
  );
};

export const useUsersChartContext = () => {
  const context = useContext(UsersChartContext);
  if (context === undefined)
    throw new Error(
      "useUsersChartContext must be used within a useUsersChartContextProvider"
    );
  return context;
};
