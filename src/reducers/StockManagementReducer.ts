import { StockAddingType, StockFetchedType } from "../types/Stocks";

export const LIST_ALL_STOCK = "LIST_ALL_STOCK";
export const GET_ONE_STOCK = "GET_ONE_STOCK";
export const ADD_NEW_STOCK = "ADD_NEW_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const MOVE_STOCK = "MOVE_STOCK";
export const REPORT_STOCK = "REPORT_STOCK";

export const LIST_DASHBOARD_STOCK = "LIST_DASHBOARD_STOCK";
export interface StockState {
  items: StockFetchedType[];
  selectedStock?: StockFetchedType | null;
  stockDashboard?: { [key: string]: any };
}

type StockActionTypes =
  | { type: typeof LIST_ALL_STOCK; payload: StockFetchedType[] }
  | { type: typeof GET_ONE_STOCK; payload: StockFetchedType }
  | { type: typeof ADD_NEW_STOCK; payload: StockAddingType }
  | { type: typeof UPDATE_STOCK; payload: StockFetchedType }
  | { type: typeof DELETE_STOCK; payload: StockFetchedType | string } // id
  | { type: typeof MOVE_STOCK; payload: { id: string; newLocation: string } }
  | { type: typeof ADD_NEW_STOCK; payload: StockAddingType }
  | { type: typeof LIST_DASHBOARD_STOCK; payload: { [key: string]: any } };
const initialState: StockState = {
  items: [],
  selectedStock: null,
  stockDashboard: {},
};

export const stockReducer = (
  state: StockState = initialState,
  action: StockActionTypes
): StockState => {
  switch (action.type) {
    case LIST_ALL_STOCK:
      return { ...state, items: action.payload };
    case LIST_DASHBOARD_STOCK:
      return { ...state, stockDashboard: action.payload };
    case GET_ONE_STOCK:
      return { ...state, selectedStock: action.payload };

    case ADD_NEW_STOCK:
      return { ...state, items: [...state.items, action.payload] };

    case UPDATE_STOCK:
      return {
        ...state,
        items: state.items.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case DELETE_STOCK:
      return {
        ...state,
        items: state.items.filter((s) => s.id !== action.payload),
      };

    case MOVE_STOCK:
      return {
        ...state,
        items: state.items.map((s) =>
          s.id === action.payload.id
            ? { ...s, location: action.payload.newLocation }
            : s
        ),
      };

      return state;
  }
};
