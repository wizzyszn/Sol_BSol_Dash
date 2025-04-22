import { UsersChart } from "@/components/charts/users-chart";
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

function Users({ timeRange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          Detailed analysis of user adoption over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <UsersChart timeRange={timeRange} detailed />
      </CardContent>
    </Card>
  );
}

export default React.memo(Users);
