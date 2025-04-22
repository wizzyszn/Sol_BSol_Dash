import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface StrategyComparisonChartProps {
  timeRange: string
  detailed?: boolean
}

export function StrategyComparisonChart({ timeRange, detailed = false }: StrategyComparisonChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      if (detailed) {
        return [
          {
            name: "bSOL-SOL LP",
            currentApy: 12.8,
            avgApy: 11.5,
            risk: 2.5,
            tvl: 42.3,
          },
          {
            name: "bSOL Lending",
            currentApy: 9.2,
            avgApy: 8.7,
            risk: 1.5,
            tvl: 31.1,
          },
          {
            name: "bSOL-mSOL LP",
            currentApy: 10.5,
            avgApy: 9.8,
            risk: 1.8,
            tvl: 37.7,
          },
          {
            name: "bSOL Staking",
            currentApy: 7.8,
            avgApy: 7.5,
            risk: 1.0,
            tvl: 98.3,
          },
          {
            name: "bSOL-USDC LP",
            currentApy: 11.3,
            avgApy: 10.2,
            risk: 3.0,
            tvl: 20.0,
          },
        ]
      } else {
        return [
          { name: "bSOL-SOL LP", apy: 12.8, risk: 2.5 },
          { name: "bSOL Lending", apy: 9.2, risk: 1.5 },
          { name: "bSOL-mSOL LP", apy: 10.5, risk: 1.8 },
          { name: "bSOL Staking", apy: 7.8, risk: 1.0 },
          { name: "bSOL-USDC LP", apy: 11.3, risk: 3.0 },
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
        <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} domain={[0, "dataMax + 1"]} />
        {detailed && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `$${value}M`}
            domain={[0, "dataMax + 10"]}
          />
        )}
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "apy" || name === "currentApy" || name === "avgApy") {
              return [`${value}%`, name === "apy" ? "APY" : name === "currentApy" ? "Current APY" : "30d Avg APY"]
            } else if (name === "risk") {
              return [value, "Risk Level (1-5)"]
            } else if (name === "tvl") {
              return [`$${value}M`, "TVL"]
            }
            return [value, name]
          }}
        />
        <Legend />
        {detailed ? (
          <>
            <Bar yAxisId="left" dataKey="currentApy" name="Current APY" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="avgApy" name="30d Avg APY" fill="#82ca9d" />
            <Bar yAxisId="left" dataKey="risk" name="Risk Level" fill="#ffc658" />
            <Bar yAxisId="right" dataKey="tvl" name="TVL ($M)" fill="#ff8042" />
          </>
        ) : (
          <>
            <Bar yAxisId="left" dataKey="apy" name="APY" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="risk" name="Risk Level" fill="#ffc658" />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}
