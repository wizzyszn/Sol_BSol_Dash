import  UsersChart  from "@/components/charts/users-chart";
import DepositorsWithdrawersChart from "@/components/charts/depositor-withdrawers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";



function Users() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          Detailed analysis of user adoption over time
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[500px]">
        <UsersChart  />
        <DepositorsWithdrawersChart />
      </CardContent>
    </Card>
  );
}

export default React.memo(Users);
