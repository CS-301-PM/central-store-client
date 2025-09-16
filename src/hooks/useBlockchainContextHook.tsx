import { createContext, useContext } from "react";
import { BlockchainLogType } from "../types/blockchain";

// Define Blockchain Log type
interface BlockchainContextType {
  recordLogs: (log: BlockchainLogType) => Promise<void>;
  getLogs: () => Promise<void>;
  logs: BlockchainLogType[];
  latestLog: BlockchainLogType | null;
  isLoading: boolean;
  error: string | null;
}

// Initial context values
const initialState: BlockchainContextType = {
  recordLogs: async () => Promise.resolve(),
  getLogs: async () => Promise.resolve(),
  logs: [],
  latestLog: null,
  isLoading: false,
  error: null,
};

// Create context
export const BlockchainContext =
  createContext<BlockchainContextType>(initialState);

// Custom hook
export const useBlockchainContext = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);

  if (!context) {
    throw new Error(
      "useBlockchainContext must be used within a BlockchainContextProvider"
    );
  }

  return context;
};
