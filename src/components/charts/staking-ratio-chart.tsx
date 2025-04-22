import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StakingRatioChartProps {
  timeRange: string
  detailed?: boolean
}

export function StakingRatioChart({ timeRange, detailed = false }: StakingRatioChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
      const result = []
      let ratio = 1.05 // Starting ratio

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the ratio growth
        const change = Math.random() * 0.004 - 0.001 // Random change between -0.001 and 0.003
        ratio += change

        const date = new Date()
        date.setDate(date.getDate() - (dataPoints - i))

        result.push({
          date: date.toISOString().split("T")[0],
          ratio: Number.parseFloat(ratio.toFixed(4)),
        })
      }

      return result
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
          }}
          tick={{ fontSize: 12 }}
        />
        <YAxis domain={[1, "auto"]} tickFormatter={(value) => value.toFixed(3)} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [value.toFixed(4), "bSOL/SOL Ratio"]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }}
        />
        <Line
          type="monotone"
          dataKey="ratio"
          name="bSOL/SOL Ratio"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
