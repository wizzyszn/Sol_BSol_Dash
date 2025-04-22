import { StakingRatioChart } from "@/components/charts/staking-ratio-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
    timeRange : string
};

function Staking({
    timeRange
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking Ratio</CardTitle>
        <CardDescription>
          Detailed analysis of bSOL/SOL exchange rate over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <StakingRatioChart timeRange={timeRange} detailed />
      </CardContent>
    </Card>
  );
}

export default React.memo(Staking);
