import { useState } from "react"
import { BarChart, LineChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ProtocolDistributionChart } from "@/components/charts/protocol-distribution-chart"
import { PoolDistributionChart } from "@/components/charts/pool-distribution-chart"
import { DefiTrendsChart } from "@/components/charts/defi-trends-chart"

export function DefiUsage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">DeFi Usage Analysis</h1>
        <p className="text-muted-foreground">
          Detailed information on where bSOL is being utilized within the DeFi landscape
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
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
                  <CardTitle>Protocol Distribution</CardTitle>
                  <CardDescription>bSOL usage across different DeFi protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProtocolDistributionChart timeRange={timeRange} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pool Distribution</CardTitle>
                  <CardDescription>bSOL usage across different liquidity pools</CardDescription>
                </CardHeader>
                <CardContent>
                  <PoolDistributionChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top DeFi Protocols by bSOL TVL</CardTitle>
                <CardDescription>Protocols with the highest bSOL locked value</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocol</TableHead>
                      <TableHead>TVL (bSOL)</TableHead>
                      <TableHead>TVL (USD)</TableHead>
                      <TableHead>% of Total</TableHead>
                      <TableHead>7d Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Raydium</TableCell>
                      <TableCell>1,245,890</TableCell>
                      <TableCell>$62.3M</TableCell>
                      <TableCell>25.4%</TableCell>
                      <TableCell className="text-green-500">+3.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Orca</TableCell>
                      <TableCell>982,450</TableCell>
                      <TableCell>$49.1M</TableCell>
                      <TableCell>20.0%</TableCell>
                      <TableCell className="text-green-500">+1.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marinade Finance</TableCell>
                      <TableCell>754,320</TableCell>
                      <TableCell>$37.7M</TableCell>
                      <TableCell>15.3%</TableCell>
                      <TableCell className="text-red-500">-0.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Solend</TableCell>
                      <TableCell>621,780</TableCell>
                      <TableCell>$31.1M</TableCell>
                      <TableCell>12.7%</TableCell>
                      <TableCell className="text-green-500">+4.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jupiter</TableCell>
                      <TableCell>498,230</TableCell>
                      <TableCell>$24.9M</TableCell>
                      <TableCell>10.1%</TableCell>
                      <TableCell className="text-green-500">+2.3%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="protocols" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Protocol-Level Analysis</CardTitle>
                <CardDescription>Detailed breakdown of bSOL usage across DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <ProtocolDistributionChart timeRange={timeRange} detailed />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocol</TableHead>
                      <TableHead>TVL (bSOL)</TableHead>
                      <TableHead>TVL (USD)</TableHead>
                      <TableHead>% of Total</TableHead>
                      <TableHead>7d Change</TableHead>
                      <TableHead>30d Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Raydium</TableCell>
                      <TableCell>1,245,890</TableCell>
                      <TableCell>$62.3M</TableCell>
                      <TableCell>25.4%</TableCell>
                      <TableCell className="text-green-500">+3.2%</TableCell>
                      <TableCell className="text-green-500">+12.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Orca</TableCell>
                      <TableCell>982,450</TableCell>
                      <TableCell>$49.1M</TableCell>
                      <TableCell>20.0%</TableCell>
                      <TableCell className="text-green-500">+1.8%</TableCell>
                      <TableCell className="text-green-500">+8.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marinade Finance</TableCell>
                      <TableCell>754,320</TableCell>
                      <TableCell>$37.7M</TableCell>
                      <TableCell>15.3%</TableCell>
                      <TableCell className="text-red-500">-0.7%</TableCell>
                      <TableCell className="text-green-500">+5.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Solend</TableCell>
                      <TableCell>621,780</TableCell>
                      <TableCell>$31.1M</TableCell>
                      <TableCell>12.7%</TableCell>
                      <TableCell className="text-green-500">+4.5%</TableCell>
                      <TableCell className="text-green-500">+15.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jupiter</TableCell>
                      <TableCell>498,230</TableCell>
                      <TableCell>$24.9M</TableCell>
                      <TableCell>10.1%</TableCell>
                      <TableCell className="text-green-500">+2.3%</TableCell>
                      <TableCell className="text-green-500">+9.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kamino Finance</TableCell>
                      <TableCell>312,450</TableCell>
                      <TableCell>$15.6M</TableCell>
                      <TableCell>6.4%</TableCell>
                      <TableCell className="text-green-500">+5.1%</TableCell>
                      <TableCell className="text-green-500">+18.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Drift Protocol</TableCell>
                      <TableCell>287,650</TableCell>
                      <TableCell>$14.4M</TableCell>
                      <TableCell>5.9%</TableCell>
                      <TableCell className="text-red-500">-1.2%</TableCell>
                      <TableCell className="text-green-500">+3.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Others</TableCell>
                      <TableCell>208,230</TableCell>
                      <TableCell>$10.4M</TableCell>
                      <TableCell>4.2%</TableCell>
                      <TableCell className="text-green-500">+0.8%</TableCell>
                      <TableCell className="text-green-500">+6.2%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pools" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pool-Level Analysis</CardTitle>
                <CardDescription>Detailed breakdown of bSOL usage across liquidity pools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <PoolDistributionChart timeRange={timeRange} detailed />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pool</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Pair</TableHead>
                      <TableHead>TVL (bSOL)</TableHead>
                      <TableHead>TVL (USD)</TableHead>
                      <TableHead>% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-SOL</TableCell>
                      <TableCell>Raydium</TableCell>
                      <TableCell>bSOL/SOL</TableCell>
                      <TableCell>845,230</TableCell>
                      <TableCell>$42.3M</TableCell>
                      <TableCell>17.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-USDC</TableCell>
                      <TableCell>Raydium</TableCell>
                      <TableCell>bSOL/USDC</TableCell>
                      <TableCell>400,660</TableCell>
                      <TableCell>$20.0M</TableCell>
                      <TableCell>8.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Whirlpool bSOL-SOL</TableCell>
                      <TableCell>Orca</TableCell>
                      <TableCell>bSOL/SOL</TableCell>
                      <TableCell>582,450</TableCell>
                      <TableCell>$29.1M</TableCell>
                      <TableCell>11.9%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Whirlpool bSOL-USDC</TableCell>
                      <TableCell>Orca</TableCell>
                      <TableCell>bSOL/USDC</TableCell>
                      <TableCell>400,000</TableCell>
                      <TableCell>$20.0M</TableCell>
                      <TableCell>8.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL-mSOL</TableCell>
                      <TableCell>Marinade Finance</TableCell>
                      <TableCell>bSOL/mSOL</TableCell>
                      <TableCell>754,320</TableCell>
                      <TableCell>$37.7M</TableCell>
                      <TableCell>15.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">bSOL Lending</TableCell>
                      <TableCell>Solend</TableCell>
                      <TableCell>bSOL</TableCell>
                      <TableCell>621,780</TableCell>
                      <TableCell>$31.1M</TableCell>
                      <TableCell>12.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Others</TableCell>
                      <TableCell>Various</TableCell>
                      <TableCell>Various</TableCell>
                      <TableCell>306,560</TableCell>
                      <TableCell>$15.3M</TableCell>
                      <TableCell>6.2%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>DeFi Usage Trends</CardTitle>
                <CardDescription>Historical trends in bSOL usage across DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <DefiTrendsChart timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
