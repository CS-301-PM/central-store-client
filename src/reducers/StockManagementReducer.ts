export const LIST_ALL_STOCK = "LIST_ALL_STOCK";
export const GET_ONE_STOCK = "GET_ONE_STOCK";
export const ADD_NEW_STOCK = "ADD_NEW_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const MOVE_STOCK = "MOVE_STOCK";
export const REPORT_STOCK = "REPORT_STOCK";

export interface Stock {
  stockId?: string;
  itemName?: string;
  originalQuantity?: number;
  currentQuantity?: number;
  costEach?: number;
  totalCost?: number;
  dateIn?: string;
}

export interface StockState {
  items: Stock[];
  selectedStock?: Stock | null;
}

type StockActionTypes =
  | { type: typeof LIST_ALL_STOCK; payload: Stock[] }
  | { type: typeof GET_ONE_STOCK; payload: Stock }
  | { type: typeof ADD_NEW_STOCK; payload: Stock }
  | { type: typeof UPDATE_STOCK; payload: Stock }
  | { type: typeof DELETE_STOCK; payload: string } // id
  | { type: typeof MOVE_STOCK; payload: { id: string; newLocation: string } }
  | { type: typeof REPORT_STOCK; payload: any }; // can refine later

const initialState: StockState = {
  items: [],
  selectedStock: null,
};

export const stockReducer = (
  state: StockState = initialState,
  action: StockActionTypes
): StockState => {
  switch (action.type) {
    case LIST_ALL_STOCK:
      return { ...state, items: action.payload };

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

    case REPORT_STOCK:
      // handle reporting logic later
      return state;

    default:
      return state;
  }
};
