import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionId from "./TransactionId";
import WalletHistory from "./WalletHistory";

export function TransactionDecoder() {
  const [transactionId, setTransactionId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedTransaction, setDecodedTransaction] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    setIsDecoding(true);

    // Simulate API call to decode transaction
    setTimeout(() => {
      setDecodedTransaction({
        signature:
          "5UfDuQqLMD3akm31dXVQ4J3JWvxs7XLDCrGxZBnbLXnDEFXXbP7UZmKUNLWZGdRGvfQ1jvSHZzwK9UEXk2ZnJKLs",
        blockTime: 1682345678,
        slot: 172839456,
        status: "confirmed",
        fee: 0.000005,
        type: "stake",
        actions: [
          {
            type: "stake",
            description: "Stake 10 SOL to SolBlaze validator",
            amount: 10,
            token: "SOL",
            from: "8YLKoCr5Nz5j1XGHYucnWHUJQ95dxmMQUZJXXXJgNunH",
            to: "SolB1azEStakeP00LXXXXXXXXXXXXXXXXXXXZn2",
            timestamp: 1682345678,
          },
          {
            type: "mint",
            description: "Mint 9.2 bSOL",
            amount: 9.2,
            token: "bSOL",
            from: "SolB1azEStakeP00LXXXXXXXXXXXXXXXXXXXZn2",
            to: "8YLKoCr5Nz5j1XGHYucnWHUJQ95dxmMQUZJXXXJgNunH",
            timestamp: 1682345678,
          },
        ],
      });
      setIsDecoding(false);
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Transaction Decoder
        </h1>
        <p className="text-muted-foreground">
          Decode and analyze bSOL transactions for a human-readable view
        </p>
      </div>

      <Tabs defaultValue="transaction" className="w-full">
        <TabsList>
          <TabsTrigger value="transaction">Transaction ID</TabsTrigger>
          <TabsTrigger value="wallet">Wallet History</TabsTrigger>
        </TabsList>

        <TabsContent value="transaction" className="space-y-4 mt-4">
          <TransactionId
            handleCopy={handleCopy}
            handleDecode={handleDecode}
            isDecoding={isDecoding}
            decodedTransaction={decodedTransaction}
            setTransactionId={setTransactionId}
            copied={copied}
            transactionId={transactionId}
          />
        </TabsContent>

        <TabsContent value="wallet" className="space-y-4 mt-4">
          <WalletHistory
            setWalletAddress={setWalletAddress}
            walletAddress={walletAddress}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
