import { TvlChart } from "@/components/charts/tvl-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";



function Tvl() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Value Locked</CardTitle>
        <CardDescription>
          Detailed analysis of TVL growth over time
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[500px]">
        <TvlChart />
      </CardContent>
    </Card>
  );
}

export default React.memo(Tvl);
