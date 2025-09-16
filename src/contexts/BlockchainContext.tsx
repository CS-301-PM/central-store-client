import React, { useReducer, useCallback } from "react";
import {
  blockchainReducer,
  RECORD_LOGS,
  GET_LOGS,
} from "../reducers/BlockchainReducer";
import { BlockchainContext } from "../hooks/useBlockchainContextHook";
import { BlockchainLogType } from "../types/blockchain";

const dataSample: BlockchainLogType[] = [
  {
    id: "1",
    transactionHash:
      "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 15847392,
    timestamp: new Date("2024-03-15T10:30:00"),
    action: "Stock Added",
    itemName: "Office Supplies - Pens",
    user: "staff001",
    userRole: "staff-central",
    status: "confirmed",
    gasUsed: 21000,
    details: {
      quantity: 500,
      location: "Warehouse A-1",
    },
  },
  {
    id: "2",
    transactionHash:
      "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    blockNumber: 15847393,
    timestamp: new Date("2024-03-15T11:15:00"),
    action: "Request Approved",
    itemName: "Computer Equipment - Laptops",
    user: "manager001",
    userRole: "manager",
    status: "confirmed",
    gasUsed: 25000,
    details: {
      quantity: 10,
      previousValue: "pending",
      newValue: "approved",
    },
  },
  {
    id: "3",
    transactionHash:
      "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
    blockNumber: 15847394,
    timestamp: new Date("2024-03-15T12:00:00"),
    action: "Delivery Confirmed",
    itemName: "Medical Supplies - Masks",
    user: "supplier001",
    userRole: "supplier",
    status: "confirmed",
    gasUsed: 30000,
    details: {
      quantity: 1000,
      location: "Receiving Dock B",
    },
  },
  {
    id: "4",
    transactionHash:
      "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    blockNumber: 15847395,
    timestamp: new Date("2024-03-15T13:30:00"),
    action: "Stock Movement",
    itemName: "Furniture - Chairs",
    user: "warehouse001",
    userRole: "staff-central",
    status: "pending",
    gasUsed: 22000,
    details: {
      quantity: 25,
      previousValue: "Warehouse A-1",
      newValue: "Warehouse B-2",
    },
  },
];

// Context Provider component
export const BlockchainContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(blockchainReducer, {
    logs: [],
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Record a new log
  const recordLogs = useCallback(async (log: BlockchainLogType) => {
    try {
      setIsLoading(true);
      // simulate API / blockchain call
      await new Promise((resolve) => setTimeout(resolve, 300));

      dispatch({ type: RECORD_LOGS, payload: log });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to record log");
      setIsLoading(false);
    }
  }, []);

  // Fetch logs
  const getLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      // simulate API / blockchain fetch
      // const fetchedLogs: BlockchainLogType[] = await new Promise((resolve) =>
      //   setTimeout(() => resolve([...state.logs]), 500)
      // );

      dispatch({ type: GET_LOGS, payload: dataSample });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
      setIsLoading(false);
    }
  }, [state.logs]);

  const latestLog =
    state.logs.length > 0 ? state.logs[state.logs.length - 1] : null;

  return (
    <BlockchainContext.Provider
      value={{
        recordLogs,
        getLogs,
        logs: state.logs,
        latestLog,
        isLoading,
        error,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
