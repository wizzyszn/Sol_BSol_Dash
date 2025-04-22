import { TvlChart } from "@/components/charts/tvl-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {
  timeRange: string;
};

function Tvl({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Value Locked</CardTitle>
        <CardDescription>
          Detailed analysis of TVL growth over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <TvlChart timeRange={timeRange} detailed />
      </CardContent>
    </Card>
  );
}

export default React.memo(Tvl);
