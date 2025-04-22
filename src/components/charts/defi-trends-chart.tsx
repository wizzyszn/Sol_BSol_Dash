import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DefiTrendsChartProps {
  timeRange: string
}

export function DefiTrendsChart({ timeRange }: DefiTrendsChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
      const result = []

      let raydium = 40 // Starting TVL in millions
      let orca = 30
      let marinade = 25
      let solend = 20
      let jupiter = 15

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the TVL growth
        raydium += Math.random() * 2 - 0.5
        orca += Math.random() * 2 - 0.5
        marinade += Math.random() * 2 - 0.5
        solend += Math.random() * 2 - 0.5
        jupiter += Math.random() * 2 - 0.5

        const date = new Date()
        date.setDate(date.getDate() - (dataPoints - i))

        result.push({
          date: date.toISOString().split("T")[0],
          raydium: Number.parseFloat(raydium.toFixed(1)),
          orca: Number.parseFloat(orca.toFixed(1)),
          marinade: Number.parseFloat(marinade.toFixed(1)),
          solend: Number.parseFloat(solend.toFixed(1)),
          jupiter: Number.parseFloat(jupiter.toFixed(1)),
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
        <YAxis tickFormatter={(value) => `$${value}M`} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`$${value}M`, ""]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="raydium" name="Raydium" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="orca" name="Orca" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="marinade" name="Marinade Finance" stroke="#ffc658" strokeWidth={2} />
        <Line type="monotone" dataKey="solend" name="Solend" stroke="#ff8042" strokeWidth={2} />
        <Line type="monotone" dataKey="jupiter" name="Jupiter" stroke="#0088fe" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
