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
import React from "react";

type Props = {
  timeRange: string;
};

function Strategies({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Analysis</CardTitle>
        <CardDescription>
          Detailed breakdown of bSOL strategy performance
        </CardDescription>
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
              <TableCell className="font-medium">
                bSOL-SOL LP + Farming
              </TableCell>
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
              <TableCell className="font-medium">
                bSOL-USDC LP + Farming
              </TableCell>
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
  );
}

export default React.memo(Strategies);
