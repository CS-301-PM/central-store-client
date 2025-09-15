import { createContext, useReducer, ReactNode } from "react";
import {
  stockReducer,
  Stock,
  StockState,
  //   initialState,
} from "../reducers/StockManagementReducer";

export type StockManagementContextType = {
  state: StockState;
  listAllStocks: (stocks: Stock[]) => void;
  getOneStock: (stock: Stock) => void;
  addStock: (stock: Stock) => void;
  updateStock: (stock: Stock) => void;
  deleteStock: (id: string) => void;
  moveStock: (id: string, newLocation: string) => void;
  reportStock: (data: any) => void;
};

export const StockManagementContext = createContext<
  StockManagementContextType | undefined
>(undefined);

const initialState: StockState = {
  items: [],
  selectedStock: null,
};

export const StockManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  const listAllStocks = (stocks: Stock[]) =>
    dispatch({ type: "LIST_ALL_STOCK", payload: stocks });

  const getOneStock = (stock: Stock) =>
    dispatch({ type: "GET_ONE_STOCK", payload: stock });

  const addStock = (stock: Stock) =>
    dispatch({ type: "ADD_NEW_STOCK", payload: stock });

  const updateStock = (stock: Stock) =>
    dispatch({ type: "UPDATE_STOCK", payload: stock });

  const deleteStock = (id: string) =>
    dispatch({ type: "DELETE_STOCK", payload: id });

  const moveStock = (id: string, newLocation: string) =>
    dispatch({ type: "MOVE_STOCK", payload: { id, newLocation } });

  const reportStock = (data: any) =>
    dispatch({ type: "REPORT_STOCK", payload: data });

  return (
    <StockManagementContext.Provider
      value={{
        state,
        listAllStocks,
        getOneStock,
        addStock,
        updateStock,
        deleteStock,
        moveStock,
        reportStock,
      }}
    >
      {children}
    </StockManagementContext.Provider>
  );
};
