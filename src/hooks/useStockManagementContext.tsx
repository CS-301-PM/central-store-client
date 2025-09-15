import { useContext } from "react";
import {
  StockManagementContext,
  StockManagementContextType,
} from "../contexts/StockManagementContext";

export const useStockManagementContext = (): StockManagementContextType => {
  const context = useContext(StockManagementContext);
  if (!context) {
    throw new Error(
      "useStockManagementContext must be used within a StockManagementProvider"
    );
  }
  return context;
};
