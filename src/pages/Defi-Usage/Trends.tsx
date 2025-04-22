import { DefiTrendsChart } from "@/components/charts/defi-trends-chart";
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

function Trends({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DeFi Usage Trends</CardTitle>
        <CardDescription>
          Historical trends in bSOL usage across DeFi protocols
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <DefiTrendsChart timeRange={timeRange} />
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(Trends);
