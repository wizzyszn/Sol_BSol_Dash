"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface ProtocolDistributionChartProps {
  timeRange: string
  detailed?: boolean
}

export function ProtocolDistributionChart({ timeRange, detailed = false }: ProtocolDistributionChartProps) {
  const [data, setData] = useState<any[]>([])
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28"]

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      // Different distribution based on time range
      if (detailed) {
        return [
          { name: "Raydium", value: 25.4 },
          { name: "Orca", value: 20.0 },
          { name: "Marinade Finance", value: 15.3 },
          { name: "Solend", value: 12.7 },
          { name: "Jupiter", value: 10.1 },
          { name: "Kamino Finance", value: 6.4 },
          { name: "Drift Protocol", value: 5.9 },
          { name: "Others", value: 4.2 },
        ]
      } else {
        return [
          { name: "Raydium", value: 25.4 },
          { name: "Orca", value: 20.0 },
          { name: "Marinade Finance", value: 15.3 },
          { name: "Solend", value: 12.7 },
          { name: "Others", value: 26.6 },
        ]
      }
    }

    setData(generateData())
  }, [timeRange, detailed])

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={detailed ? 120 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`, "Protocol Share"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
