import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface MarketShareChartProps {
  timeRange: string
}

export function MarketShareChart({ timeRange }: MarketShareChartProps) {
  const [data, setData] = useState<any[]>([])
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      // Different market shares based on time range to show growth
      let bsolShare = 0

      if (timeRange === "7d") {
        bsolShare = 14.2
      } else if (timeRange === "30d") {
        bsolShare = 13.8
      } else if (timeRange === "90d") {
        bsolShare = 12.5
      } else {
        bsolShare = 10.2
      }

      return [
        { name: "bSOL", value: bsolShare },
        { name: "mSOL", value: 32.5 },
        { name: "stSOL", value: 24.8 },
        { name: "jitoSOL", value: 18.3 },
        { name: "Others", value: 100 - bsolShare - 32.5 - 24.8 - 18.3 },
      ]
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`, "Market Share"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
