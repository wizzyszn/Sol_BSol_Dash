import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PoolDistributionChartProps {
  timeRange: string
  detailed?: boolean
}

export function PoolDistributionChart({ timeRange, detailed = false }: PoolDistributionChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      if (detailed) {
        return [
          { name: "bSOL-SOL (Raydium)", tvl: 42.3 },
          { name: "bSOL-USDC (Raydium)", tvl: 20.0 },
          { name: "bSOL-SOL (Orca)", tvl: 29.1 },
          { name: "bSOL-USDC (Orca)", tvl: 20.0 },
          { name: "bSOL-mSOL", tvl: 37.7 },
          { name: "bSOL Lending", tvl: 31.1 },
          { name: "Others", tvl: 15.3 },
        ]
      } else {
        return [
          { name: "bSOL-SOL", tvl: 71.4 },
          { name: "bSOL-USDC", tvl: 40.0 },
          { name: "bSOL-mSOL", tvl: 37.7 },
          { name: "bSOL Lending", tvl: 31.1 },
          { name: "Others", tvl: 15.3 },
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
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
        <XAxis type="number" tickFormatter={(value) => `$${value}M`} tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={150} />
        <Tooltip formatter={(value: number) => [`$${value}M`, "TVL"]} />
        <Legend />
        <Bar dataKey="tvl" name="TVL (USD)" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
