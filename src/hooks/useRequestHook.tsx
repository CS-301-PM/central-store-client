import { useContext } from "react";
import {
  RequestManagementContext,
  RequestManagementContextType,
} from "../contexts/RequestContext";

export const useRequestManagementContext = (): RequestManagementContextType => {
  const context = useContext(RequestManagementContext);
  if (!context) {
    throw new Error(
      "useRequestManagementContext must be used within a RequestManagementProvider"
    );
  }
  return context;
};
