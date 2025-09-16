export type BlockchainLogType = {
  id: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: Date;
  action: string;
  itemName: string;
  user: string;
  userRole: string;
  status: "confirmed" | "pending" | "failed";
  gasUsed: number;
  details: {
    previousValue?: string;
    newValue?: string;
    quantity?: number;
    location?: string;
  };
}