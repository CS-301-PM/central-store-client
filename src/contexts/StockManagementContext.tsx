import { createContext, useReducer, ReactNode } from "react";
import {
  stockReducer,
  Stock,
  StockState,
  //   initialState,
} from "../reducers/StockManagementReducer";
import { simpleStocks } from "../utils/Constants";

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

  const listAllStocks = async (stocks: Stock[]) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/all`;
    const res = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ requestId, statusType }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const allStocks = await res.json();
    dispatch({
      type: "LIST_ALL_STOCK",
      payload: allStocks,
    });
  };

  const getOneStock = (stock: Stock) =>
    dispatch({ type: "GET_ONE_STOCK", payload: stock });

  const addStock = async (stock: Stock) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/add`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const allStocks = await res.json();
    dispatch({ type: "ADD_NEW_STOCK", payload: allStocks });
  };

  const updateStock = async (stock: Stock) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/update`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const allStocks = await res.json();
    dispatch({ type: "UPDATE_STOCK", payload: stock });
  };

  const deleteStock = async (id: string) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/delete`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stockId: id }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const allStocks = await res.json();
    dispatch({ type: "DELETE_STOCK", payload: id });
  };

  const moveStock = async (id: string, newLocation: string) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/move`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newLocation }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const allStocks = await res.json();
    dispatch({ type: "MOVE_STOCK", payload: { id, newLocation } });
  };

  const reportStock = async (data: any) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/report`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const allStocks = await res.json();
    dispatch({ type: "REPORT_STOCK", payload: data });
  };

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
