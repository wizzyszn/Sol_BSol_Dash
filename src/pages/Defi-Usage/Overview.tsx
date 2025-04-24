import { PoolDistributionChart } from "@/components/charts/pool-distribution-chart";
import  ProtocolDistributionChart  from "@/components/charts/protocol-distribution-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table
} from "@/components/ui/table";
import React from "react";

type Props = {
  timeRange: string;
};

function Overview({ timeRange }: Props) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>
              bSOL usage across different DeFi protocols
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProtocolDistributionChart  />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pool Distribution</CardTitle>
            <CardDescription>
              bSOL usage across different liquidity pools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PoolDistributionChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top DeFi Protocols by bSOL TVL</CardTitle>
          <CardDescription>
            Protocols with the highest bSOL locked value
          </CardDescription>
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
    </>
  );
}

export default React.memo(Overview);
