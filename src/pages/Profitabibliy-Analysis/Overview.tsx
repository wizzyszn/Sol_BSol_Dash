import { ApyComparisonChart } from "@/components/charts/apy-comparison-chart";
import { StrategyComparisonChart } from "@/components/charts/strategy-comparison-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  timeRange: string;
};

function Overview({ timeRange }: Props) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>APY Comparison</CardTitle>
            <CardDescription>
              bSOL vs other liquid staking tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApyComparisonChart timeRange={timeRange} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Strategy Comparison</CardTitle>
            <CardDescription>
              Performance of different bSOL strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrategyComparisonChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top bSOL Strategies by APY</CardTitle>
          <CardDescription>
            Most profitable strategies using bSOL
          </CardDescription>
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
                <TableCell className="font-medium">
                  bSOL-SOL LP + Farming
                </TableCell>
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
                <TableCell className="font-medium">
                  bSOL-USDC LP + Farming
                </TableCell>
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
    </>
  );
}

export default Overview;
