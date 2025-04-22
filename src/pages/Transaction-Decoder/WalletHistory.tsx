import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
};

function WalletHistory({ walletAddress, setWalletAddress }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Transaction History</CardTitle>
        <CardDescription>
          View all bSOL transactions for a specific wallet address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1"
          />
          <Button disabled={!walletAddress}>Search</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Example: 8YLKoCr5Nz5j1XGHYucnWHUJQ95dxmMQUZJXXXJgNunH
        </p>
      </CardContent>
      <CardFooter>
        <Alert>
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            Wallet transaction history analysis is under development and will be
            available soon.
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}

export default React.memo(WalletHistory);
