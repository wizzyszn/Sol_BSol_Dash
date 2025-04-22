import { ProtocolDistributionChart } from "@/components/charts/protocol-distribution-chart";
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

function Protocols({ timeRange }: Props) {
  return (
    <>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Protocol-Level Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of bSOL usage across DeFi protocols
          </CardDescription>
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
    </>
  );
}

export default React.memo(Protocols);
