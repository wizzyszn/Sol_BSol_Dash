"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TvlChartProps {
  timeRange: string
  detailed?: boolean
}

export function TvlChart({ timeRange, detailed = false }: TvlChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
      const result = []
      let tvl = 200 // Starting TVL in millions

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the TVL growth
        const change = Math.random() * 6 - 2 // Random change between -2 and 4
        tvl += change

        const date = new Date()
        date.setDate(date.getDate() - (dataPoints - i))

        result.push({
          date: date.toISOString().split("T")[0],
          tvl: Number.parseFloat(tvl.toFixed(1)),
          staked: Number.parseFloat((tvl * 0.85).toFixed(1)),
          defi: Number.parseFloat((tvl * 0.15).toFixed(1)),
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
        <YAxis tickFormatter={(value) => `$${value}M`} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [`$${value}M`, ""]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="tvl" name="Total TVL" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
        {detailed && (
          <>
            <Line type="monotone" dataKey="staked" name="Staked" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="defi" name="DeFi" stroke="#ffc658" strokeWidth={2} />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
