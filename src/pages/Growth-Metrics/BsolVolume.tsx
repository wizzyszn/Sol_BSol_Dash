import BSOLVolumeChart from "@/components/charts/bsol-sol-volume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function BSolVolume() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume Ratio</CardTitle>
        <CardDescription>
          Detailed analysis of bSOL/SOL exchange rate over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <BSOLVolumeChart />
      </CardContent>
    </Card>
  );
}

export default React.memo(BSolVolume);
