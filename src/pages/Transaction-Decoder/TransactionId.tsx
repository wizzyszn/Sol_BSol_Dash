import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Copy, ExternalLink } from "lucide-react";
import React from "react";

type Props = {
  transactionId: string;
  isDecoding: boolean;
  decodedTransaction: any;
  copied: boolean;
  handleDecode: () => void;
  setTransactionId: React.Dispatch<React.SetStateAction<string>>;
  handleCopy: (text: string) => void;
};

function TransactionId({
  transactionId,
  isDecoding,
  decodedTransaction,
  copied,
  handleDecode,
  setTransactionId,
  handleCopy,
}: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Decode Transaction</CardTitle>
          <CardDescription>
            Enter a Solana transaction ID to decode bSOL interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter transaction signature/ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleDecode}
              disabled={!transactionId || isDecoding}
            >
              {isDecoding ? "Decoding..." : "Decode"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Example:
            5UfDuQqLMD3akm31dXVQ4J3JWvxs7XLDCrGxZBnbLXnDEFXXbP7UZmKUNLWZGdRGvfQ1jvSHZzwK9UEXk2ZnJKLs
          </p>
        </CardContent>
      </Card>

      {decodedTransaction && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Decoded Transaction</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleCopy(JSON.stringify(decodedTransaction, null, 2))
                  }
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://solscan.io/tx/${decodedTransaction.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Explorer
                  </a>
                </Button>
              </div>
            </div>
            <CardDescription>
              Transaction details in human-readable format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Transaction ID</p>
                <p className="text-sm text-muted-foreground break-all">
                  {decodedTransaction.signature}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Block Time</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    decodedTransaction.blockTime * 1000
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Slot</p>
                <p className="text-sm text-muted-foreground">
                  {decodedTransaction.slot.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant="outline" className="capitalize">
                  {decodedTransaction.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Fee</p>
                <p className="text-sm text-muted-foreground">
                  {decodedTransaction.fee} SOL
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <Badge variant="outline" className="capitalize">
                  {decodedTransaction.type}
                </Badge>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Transaction Actions</p>
              <div className="space-y-4">
                {decodedTransaction.actions.map(
                  (action: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="capitalize">
                          {action.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(action.timestamp * 1000).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm mb-2">{action.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Amount</p>
                          <p className="text-muted-foreground">
                            {action.amount} {action.token}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">From</p>
                          <p className="text-muted-foreground truncate">
                            {action.from}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">To</p>
                          <p className="text-muted-foreground truncate">
                            {action.to}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default React.memo(TransactionId);
