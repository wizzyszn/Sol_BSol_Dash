import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ApyComparisonChartProps {
  timeRange: string
  detailed?: boolean
}

export function ApyComparisonChart({ timeRange, detailed = false }: ApyComparisonChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      if (detailed) {
        return [
          { name: "bSOL", baseApy: 7.8, avgApy: 7.5, maxApy: 12.8 },
          { name: "mSOL", baseApy: 7.2, avgApy: 7.0, maxApy: 11.5 },
          { name: "stSOL", baseApy: 7.0, avgApy: 6.8, maxApy: 10.8 },
          { name: "jitoSOL", baseApy: 7.5, avgApy: 7.3, maxApy: 12.2 },
          { name: "scnSOL", baseApy: 7.1, avgApy: 6.9, maxApy: 11.0 },
        ]
      } else {
        return [
          { name: "bSOL", apy: 7.8 },
          { name: "mSOL", apy: 7.2 },
          { name: "stSOL", apy: 7.0 },
          { name: "jitoSOL", apy: 7.5 },
          { name: "scnSOL", apy: 7.1 },
        ]
      }
    }

    setData(generateData())
  }, [timeRange, detailed])

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}%`} domain={[0, "dataMax + 1"]} />
        <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
        <Legend />
        {detailed ? (
          <>
            <Bar dataKey="baseApy" name="Base APY" fill="#8884d8" />
            <Bar dataKey="avgApy" name="30d Avg APY" fill="#82ca9d" />
            <Bar dataKey="maxApy" name="Max Strategy APY" fill="#ffc658" />
          </>
        ) : (
          <Bar dataKey="apy" name="Base APY" fill="#8884d8" />
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}
