"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface UsersChartProps {
  timeRange: string
  detailed?: boolean
}

export function UsersChart({ timeRange, detailed = false }: UsersChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Mock data generation based on time range
    const generateData = () => {
      const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
      const result = []
      let users = 20000 // Starting users
      let newUsers = 200 // Daily new users
      let activeUsers = 15000 // Active users

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness to the user growth
        const change = Math.floor(Math.random() * 300) - 50 // Random change between -50 and 250
        users += change
        newUsers = Math.max(50, Math.floor(Math.random() * 400))
        activeUsers = Math.floor(users * (0.7 + Math.random() * 0.1)) // 70-80% of total users

        const date = new Date()
        date.setDate(date.getDate() - (dataPoints - i))

        result.push({
          date: date.toISOString().split("T")[0],
          users,
          newUsers,
          activeUsers,
        })
      }

      return result
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
      <AreaChart
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
        <YAxis tickFormatter={(value) => value.toLocaleString()} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [value.toLocaleString(), ""]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="users"
          name="Total Users"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        {detailed && (
          <>
            <Area
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="newUsers"
              name="New Users"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}
