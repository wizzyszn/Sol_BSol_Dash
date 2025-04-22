import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface HistoricalApyChartProps {
  timeRange: string
}

export function HistoricalApyChart({ timeRange }: HistoricalApyChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
      const result = []

      let bsolStaking = 7.5 // Starting APY
      let bsolSolLp = 12.0
      let bsolLending = 9.0
      let bsolMsolLp = 10.0
      let bsolUsdcLp = 11.0

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the APY
        bsolStaking += Math.random() * 0.2 - 0.1
        bsolSolLp += Math.random() * 0.4 - 0.2
        bsolLending += Math.random() * 0.3 - 0.15
        bsolMsolLp += Math.random() * 0.3 - 0.15
        bsolUsdcLp += Math.random() * 0.4 - 0.2

        const date = new Date()
        date.setDate(date.getDate() - (dataPoints - i))

        result.push({
          date: date.toISOString().split("T")[0],
          bsolStaking: Number.parseFloat(bsolStaking.toFixed(2)),
          bsolSolLp: Number.parseFloat(bsolSolLp.toFixed(2)),
          bsolLending: Number.parseFloat(bsolLending.toFixed(2)),
          bsolMsolLp: Number.parseFloat(bsolMsolLp.toFixed(2)),
          bsolUsdcLp: Number.parseFloat(bsolUsdcLp.toFixed(2)),
        })
      }

      return result
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={500}>
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
        <YAxis tickFormatter={(value) => `${value}%`} domain={[0, "dataMax + 1"]} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`${value}%`, ""]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="bsolStaking" name="bSOL Staking" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="bsolSolLp" name="bSOL-SOL LP" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="bsolLending" name="bSOL Lending" stroke="#ffc658" strokeWidth={2} />
        <Line type="monotone" dataKey="bsolMsolLp" name="bSOL-mSOL LP" stroke="#ff8042" strokeWidth={2} />
        <Line type="monotone" dataKey="bsolUsdcLp" name="bSOL-USDC LP" stroke="#0088fe" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
