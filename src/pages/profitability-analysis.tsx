import { useState } from "react"
import { BarChart, LineChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ApyComparisonChart } from "@/components/charts/apy-comparison-chart"
import { StrategyComparisonChart } from "@/components/charts/strategy-comparison-chart"
import { HistoricalApyChart } from "@/components/charts/historical-apy-chart"

export function ProfitabilityAnalysis() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profitability Analysis</h1>
        <p className="text-muted-foreground">Analysis of the profitability of various DeFi strategies involving bSOL</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <BarChart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LineChart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>APY Comparison</CardTitle>
                  <CardDescription>bSOL vs other liquid staking tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApyComparisonChart timeRange={timeRange} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Strategy Comparison</CardTitle>
                  <CardDescription>Performance of different bSOL strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <StrategyComparisonChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top bSOL Strategies by APY</CardTitle>
                <CardDescription>Most profitable strategies using bSOL</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Current APY</TableHead>
                      <TableHead>30d Avg APY</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>TVL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-SOL LP + Farming</TableCell>
                      <TableCell>Raydium</TableCell>
                      <TableCell className="text-green-500">12.8%</TableCell>
                      <TableCell>11.5%</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>$42.3M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL Lending</TableCell>
                      <TableCell>Solend</TableCell>
                      <TableCell className="text-green-500">9.2%</TableCell>
                      <TableCell>8.7%</TableCell>
                      <TableCell>Low</TableCell>
                      <TableCell>$31.1M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-mSOL LP</TableCell>
                      <TableCell>Marinade Finance</TableCell>
                      <TableCell className="text-green-500">10.5%</TableCell>
                      <TableCell>9.8%</TableCell>
                      <TableCell>Low</TableCell>
                      <TableCell>$37.7M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL Staking</TableCell>
                      <TableCell>SolBlaze</TableCell>
                      <TableCell className="text-green-500">7.8%</TableCell>
                      <TableCell>7.5%</TableCell>
                      <TableCell>Very Low</TableCell>
                      <TableCell>$98.3M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-USDC LP + Farming</TableCell>
                      <TableCell>Orca</TableCell>
                      <TableCell className="text-green-500">11.3%</TableCell>
                      <TableCell>10.2%</TableCell>
                      <TableCell>Medium-High</TableCell>
                      <TableCell>$20.0M</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategy Analysis</CardTitle>
                <CardDescription>Detailed breakdown of bSOL strategy performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <StrategyComparisonChart timeRange={timeRange} detailed />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Current APY</TableHead>
                      <TableHead>7d Avg</TableHead>
                      <TableHead>30d Avg</TableHead>
                      <TableHead>90d Avg</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>TVL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-SOL LP + Farming</TableCell>
                      <TableCell>Raydium</TableCell>
                      <TableCell className="text-green-500">12.8%</TableCell>
                      <TableCell>12.3%</TableCell>
                      <TableCell>11.5%</TableCell>
                      <TableCell>10.8%</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>$42.3M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL Lending</TableCell>
                      <TableCell>Solend</TableCell>
                      <TableCell className="text-green-500">9.2%</TableCell>
                      <TableCell>9.0%</TableCell>
                      <TableCell>8.7%</TableCell>
                      <TableCell>8.3%</TableCell>
                      <TableCell>Low</TableCell>
                      <TableCell>$31.1M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-mSOL LP</TableCell>
                      <TableCell>Marinade Finance</TableCell>
                      <TableCell className="text-green-500">10.5%</TableCell>
                      <TableCell>10.2%</TableCell>
                      <TableCell>9.8%</TableCell>
                      <TableCell>9.5%</TableCell>
                      <TableCell>Low</TableCell>
                      <TableCell>$37.7M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL Staking</TableCell>
                      <TableCell>SolBlaze</TableCell>
                      <TableCell className="text-green-500">7.8%</TableCell>
                      <TableCell>7.7%</TableCell>
                      <TableCell>7.5%</TableCell>
                      <TableCell>7.2%</TableCell>
                      <TableCell>Very Low</TableCell>
                      <TableCell>$98.3M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-USDC LP + Farming</TableCell>
                      <TableCell>Orca</TableCell>
                      <TableCell className="text-green-500">11.3%</TableCell>
                      <TableCell>11.0%</TableCell>
                      <TableCell>10.2%</TableCell>
                      <TableCell>9.8%</TableCell>
                      <TableCell>Medium-High</TableCell>
                      <TableCell>$20.0M</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="mt-4">
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
          </TabsContent>

          <TabsContent value="comparison" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>LST Comparison</CardTitle>
                <CardDescription>bSOL vs other liquid staking tokens on Solana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <ApyComparisonChart timeRange={timeRange} detailed />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Base APY</TableHead>
                      <TableHead>Avg APY (30d)</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Exchange Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">bSOL</TableCell>
                      <TableCell>SolBlaze</TableCell>
                      <TableCell className="text-green-500">7.8%</TableCell>
                      <TableCell>7.5%</TableCell>
                      <TableCell>$245.8M</TableCell>
                      <TableCell>1 bSOL = 1.089 SOL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">mSOL</TableCell>
                      <TableCell>Marinade Finance</TableCell>
                      <TableCell className="text-green-500">7.2%</TableCell>
                      <TableCell>7.0%</TableCell>
                      <TableCell>$412.5M</TableCell>
                      <TableCell>1 mSOL = 1.078 SOL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">stSOL</TableCell>
                      <TableCell>Lido</TableCell>
                      <TableCell className="text-green-500">7.0%</TableCell>
                      <TableCell>6.8%</TableCell>
                      <TableCell>$325.2M</TableCell>
                      <TableCell>1 stSOL = 1.072 SOL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">jitoSOL</TableCell>
                      <TableCell>Jito</TableCell>
                      <TableCell className="text-green-500">7.5%</TableCell>
                      <TableCell>7.3%</TableCell>
                      <TableCell>$198.7M</TableCell>
                      <TableCell>1 jitoSOL = 1.083 SOL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">scnSOL</TableCell>
                      <TableCell>Socean</TableCell>
                      <TableCell className="text-green-500">7.1%</TableCell>
                      <TableCell>6.9%</TableCell>
                      <TableCell>$87.3M</TableCell>
                      <TableCell>1 scnSOL = 1.075 SOL</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
