import { PoolDistributionChart } from "@/components/charts/pool-distribution-chart";
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

function Pools({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pool-Level Analysis</CardTitle>
        <CardDescription>
          Detailed breakdown of bSOL usage across liquidity pools
        </CardDescription>
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
  );
}

export default React.memo(Pools);
