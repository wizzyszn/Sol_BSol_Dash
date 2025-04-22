import { HistoricalApyChart } from '@/components/charts/historical-apy-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
    timeRange : string
}

function Historical({timeRange}: Props) {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Historical APY</CardTitle>
      <CardDescription>Historical APY trends for bSOL strategies</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[500px]">
        <HistoricalApyChart timeRange={timeRange} />
      </div>
    </CardContent>
  </Card>
  )
}

export default Historical