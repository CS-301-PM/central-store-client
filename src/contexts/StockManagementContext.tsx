import { createContext, useReducer, ReactNode } from "react";
import {
  stockReducer,
  Stock,
  StockState,
  //   initialState,
} from "../reducers/StockManagementReducer";
// import { simpleStocks } from "../utils/Constants";

export type StockManagementContextType = {
  state: StockState;
  listAllStocks: (stocks: Stock[]) => void;
  getOneStock: (stock: Stock) => void;
  addStock: (stock: Stock) => void;
  updateStock: (stock: Stock) => void;
  deleteStock: (id: string) => void;
  moveStock: (id: string, newLocation: string) => void;
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

  const listAllStocks = async () => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stocks: ${response.status}`);
      }

      const stocksData = await response.json();

      // console.log(stocksData);

      dispatch({
        type: "LIST_ALL_STOCK",
        payload: stocksData.data, // the fetched stock list
      });

      return stocksData;
    } catch (error) {
      console.error("Error fetching stocks:", error);
      throw error;
    }
  };

  const getOneStock = (stock: Stock) =>
    dispatch({ type: "GET_ONE_STOCK", payload: stock });

  const addStock = async (stock: Stock) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/create/`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(stock),
      });

      if (!response.ok) {
        throw new Error(`Failed to add stock: ${response.status}`);
      }

      const addedStock = await response.json();

      dispatch({ type: "ADD_NEW_STOCK", payload: addedStock });
      return addedStock;
    } catch (error) {
      console.error("Error adding stock:", error);
      throw error;
    }
  };

  const updateStock = async (stock: Stock) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/${stock.stockId}/`;

    try {
      const response = await fetch(URL, {
        method: "PUT", // or PATCH if your API supports partial update
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(stock),
      });

      if (!response.ok) {
        throw new Error(`Failed to update stock: ${response.status}`);
      }

      const updatedStock = await response.json();
      dispatch({ type: "UPDATE_STOCK", payload: updatedStock });
      return updatedStock;
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  };

  const deleteStock = async (id: string) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/${id}/`;

    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete stock: ${response.status}`);
      }

      // Some APIs return 204 No Content
      let data = null;
      if (response.status !== 204) {
        data = await response.json();
      }

      dispatch({ type: "DELETE_STOCK", payload: id });
      return data;
    } catch (error) {
      console.error("Error deleting stock:", error);
      throw error;
    }
  };

  const moveStock = async (id: string, newLocation: string) => {
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const URL = `${import.meta.env.VITE_SERVER}/api/stocks/${id}/move/`;

    try {
      const response = await fetch(URL, {
        method: "PATCH", // or PUT depending on your backend
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ location: newLocation }),
      });

      if (!response.ok) {
        throw new Error(`Failed to move stock: ${response.status}`);
      }

      const updatedStock = await response.json();

      dispatch({
        type: "MOVE_STOCK",
        payload: { id, newLocation: updatedStock.location },
      });

      return updatedStock;
    } catch (error) {
      console.error("Error moving stock:", error);
      throw error;
    }
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
      }}
    >
      {children}
    </StockManagementContext.Provider>
  );
};
