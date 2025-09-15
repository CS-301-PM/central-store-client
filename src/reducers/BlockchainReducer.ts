import { BlockchainLogType } from "../types/blockchain";

// Action Types
export const RECORD_LOGS = "RECORD_LOGS";
export const GET_LOGS = "GET_LOGS";

// Log structure
interface BlockchainState {
  logs: BlockchainLogType[];
}

// Initial state
const initialState: BlockchainState = {
  logs: [],
};

// Action types
type BlockchainActionTypes =
  | { type: typeof RECORD_LOGS; payload: BlockchainLogType }
  | { type: typeof GET_LOGS; payload: BlockchainLogType[] };

// Reducer
export const blockchainReducer = (
  state: BlockchainState = initialState,
  action: BlockchainActionTypes
): BlockchainState => {
  switch (action.type) {
    case RECORD_LOGS:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };

    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };

    default:
      return state;
  }
};
