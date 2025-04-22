import { ApyComparisonChart } from "@/components/charts/apy-comparison-chart";
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

function Comparison({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LST Comparison</CardTitle>
        <CardDescription>
          bSOL vs other liquid staking tokens on Solana
        </CardDescription>
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
  );
}

export default React.memo(Comparison);
